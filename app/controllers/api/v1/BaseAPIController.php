<?php
use Illuminate\Support\Facades\Response;


/**
 * Class BaseAPIController
 */
class BaseAPIController extends BaseController {

	protected $status_code = 200;

  const CODE_WRONG_ARGS = 100;
  const CODE_NOT_FOUND = 200;
  const CODE_INTERNAL_ERROR = 666;
  const CODE_UNAUTHORIZED = 900;
  const CODE_FORBIDDEN = 1000;

  /**
   * @var $params
   *
   * The POST array, or the PHP input stream.
   */
  public $params;

  /**
   * @var $endpoint
   *
   * The URL endpoint being queried.
   */
  public $endpoint;

  /**
   * @var $api_account_id
   *
   * The ID of the API customer. Set once authenticated.
   */
  public $api_account_id = "(SYSTEM)"; // Remove the '= 1' bit - used only for testing

  /**
   * Microtimes for benchmarking.
   *
   * @var $time_start
   * @var $time_end
   */
  public $time_start;
  public $time_end;

  /**
   * Response format - json or xml
   *
   * @var $response_format
   *
   * Not required to be actively set - default is json.
   */
  public $response_format;


  /**
   * API-specific construct
   */
  public function __construct()
  {
  	// Instantiate the required model.
    // This controller only uses functions from the BaseModel.
    $this->base_model = new BaseModel();

    // If they have utilised the $_POST array, override the PHP headers.
    if(count($_POST) >= 1)
    {
        $this->params = Input::all();
    }

    // Set the requested endpoint
    $this->endpoint = Request::segment(3);
  }

  /**
   * Set OK response.
   *
   * @param array $data
   * @return string
   */
  public function response_ok($data)
  {

      $response = [
          'data' => $data
      ];

      return $this->response($response);
  }

  /**
   * Set Error response.
   *
   * @param string $message
   * @param int $error_code
   * @return mixed
   */
  public function response_error($message, $error_code)
  {
      $response = [
          'error' => [
              'code' => $error_code,
              'http_code' => $this->status_code,
              'message' => $message,
          ]
      ];

      return $this->response($response);
  }

  /**
   * Set JSON or XML response.
   *
   * @param $data
   * @param string $response_format
   * @return mixed
   */

  public function response($data, $response_format = 'json')
  {
      if(isset($this->response_format) && ($this->response_format == "xml"))
      {
          $response_format = "xml";
      }

      $this->time_end = $this->microtime_float();
      $elapsed        = ($this->time_end - $this->time_start);

      $this->record_api_request($data, $elapsed);


      if($response_format == "xml")
      {
          $this->reply_in_xml($data);
      }
      else
      {
          return Response::json($data, $this->status_code);
      }
  }

  /**
  * Getter for status_code
  *
  * @return mixed
  */
  public function get_status_code()
  {
      return $this->status_code;
  }

  /**
   * Setter for status_code
   *
   * @param int $status_code Value to set
   *
   * @return self
   */
  public function set_status_code($status_code)
  {
      $this->status_code = $status_code;
      return $this;
  }

  /**
   * Generates a Response with a 403 HTTP header and a given message.
   *
   * @param string $message
   *
   * @return mixed
   */
  public function error_forbidden($message = 'Forbidden')
  {
      return $this->set_status_code(403)->response_error($message, self::CODE_FORBIDDEN);
  }

  /**
   * Generates a Response with a 500 HTTP header and a given message.
   *
   * @param string $message
   *
   * @return mixed
   */
  public function error_internal($message = 'Internal Error')
  {
      return $this->set_status_code(500)->response_error($message, self::CODE_INTERNAL_ERROR);
  }

  /**
   * Generates a Response with a 404 HTTP header and a given message.
   *
   * @param string $message
   *
   * @return mixed
   */
  public function error_not_found($message = 'Resource Not Found')
  {
      return $this->set_status_code(404)->response_error($message, self::CODE_NOT_FOUND);
  }

  /**
   * Generates a Response with a 401 HTTP header and a given message.
   *
   * @param string $message
   *
   * @return mixed
   */
  public function error_unauthorized($message = 'Unauthorized')
  {
      return $this->set_status_code(401)->response_error($message, self::CODE_UNAUTHORIZED);
  }

  /**
   * Generates a Response with a 400 HTTP header and a given message.
   *
   * @param string $message
   *
   * @return mixed
   */
  public function error_wrong_args($message = 'Wrong Arguments')
  {
      return $this->set_status_code(400)->response_error($message, self::CODE_WRONG_ARGS);
  }

  /**
     * Taking incoming parameters from a POST, save the details to a specific model (already instantiated)
     *
     * @param $model
     * An already-instantiated data model
     *
     *
     * @param $model_name
     * The name of the model - used in call_user_func() so it can be called statically
     *
     * @param $table
     * The name of the DB table
     *
     * @param $params
     * The incoming POST array
     *
     * @return array
     */
    public function create_or_update($model, $model_name, $table, $params)
    {

      /**
       * Set some defaults.
       */
      $resource           = $model;
      $key                = 'resource_id';
      $action             = 'created';
      $existing_resource_data  = [];

      /**
       * If 'id' is set in incoming params set, search for it in the table's json_data field.
       * If found, update the record.
       * If not found, create a new record.
       */
      if(isset($params['id']))
      {
          $resource_exists = $this->base_model->find_resource_by_json_id($table, $params['id']);

          if($resource_exists)
          {
              foreach($resource_exists as $resource_id => $actual_resource)
              {
                  $resource       = call_user_func(array($model_name, 'find'), $resource_id);
                  break;
              }

              $existing_resource_data  = (array) json_decode($resource->json_data);

              $key                = 'resource_id_updated';
              $action             = 'updated';
          }
      }

      // Recast $params to be appended to/updated
      $params             = array_merge($existing_resource_data, $params);

      // TESTING: if a value is numeric, cast it as so.
      foreach($params as $paramkey => $value)
      {
          if(is_numeric($value))
          {
              $params[$paramkey] = (float) $value;
          }
      }
      // TESTING end

      // Save the resource
      $resource->json_data = json_encode($params);
      $resource->save();


      // Save the change in data, in case it's necessary to check on data versions
      $this->save_data_version($table, $resource->id, $params['id'], $existing_resource_data, $params);


      // Save a generic event for the action based on the data at hand
      $event_array = $this->set_crud_action_event_array($model_name, $resource, $action);
      SystemEvent::register($event_array);


      /**
       * Set a reply.
       */
      return $reply = [
          $key => $resource->id
      ];
  }
}