<?php

class BaseModel extends \Eloquent {
	public function run_sql_query($sql, $bind_array = [])
  {
      return DB::select(DB::raw($sql), $bind_array);
  }

  /**
   * Find a row within a table based on json_data->>'id'
   *
   * Note that it's not searching based on the table's standard 'id' primary key - it's an id within the json.
   *
   * @param $table
   * @param $id
   * @return bool|mixed
   */
  public function find_resource_by_json_id($table, $id)
  {
      // Set the SQL and the bind array
      $sql        = "SELECT id, json_data FROM ".$table."
          WHERE json_data->>'id'=?
          AND deleted_at IS NULL
          ORDER BY json_data->>'id' ASC
          LIMIT 1";
      $bind_array = [$id];

      // Run the query
      $reply      = $this->run_sql_query($sql, $bind_array);

      if(count($reply) == 1)
      {
          // Return the JSON data.
          $returned_data = [];
          foreach($reply as $subreply)
          {
              $subreply_id = $subreply->id;

              $returned_data[$subreply_id] = json_decode($subreply->json_data);

              break;
          }


          return (object) $returned_data;
      }
      return false;
  }


  /**
   * Find all resources based on a specific attribute value
   *
   *
   * @param $table
   * @param $key
   * @param $value
   * @return mixed
   */
  public function find_resources_by_json_attribute_value($table, $key, $value)
  {
      // Set the SQL and the bind array
      $sql = "SELECT * FROM ".$table."
          WHERE ".$key."=?
          ORDER BY 'id' ASC";

      $bind_array = [$value];

      // Run the query
      $reply  = $this->run_sql_query($sql, $bind_array);

      return $reply;
  }

  /**
   * Find all resources based on a specific attribute
   *
   *
   * @param $table
   * @param $key
   * @return mixed
   */
  public function find_resources_by_json_attribute($table, $key)
  {
      // Set the SQL and the bind array
      $sql        = "SELECT * FROM ".$table."
          WHERE (json_data->>'".$key."')::text is not null
          AND deleted_at IS NULL
          ORDER BY json_data->>'id' ASC
          LIMIT 1";


      // Run the query
      $reply      = $this->run_sql_query($sql);

      return $reply;
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
          $resource_exists = $this->find_resource_by_json_id($table, $params['id']);

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