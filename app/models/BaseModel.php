<?php

class BaseModel extends \Eloquent {
	public function run_sql_query($sql, $bind_array = [])
  {
      return DB::select(DB::raw($sql), $bind_array);
  }
}