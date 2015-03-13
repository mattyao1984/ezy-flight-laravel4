<?php

class UsersTableSeeder extends Seeder {

	public function run()
	{
		$users = [
            [
                'email' => 'matt@arkade.com.au',
                'password' => '1234',
                'activated' => '1',
                'first_name' => 'Matt',
                'last_name' => 'Yao'
            ],
            [
                'email' => 'luke@b2cloud.com.au',
                'password' => '1234',
                'activated' => '1',
                'first_name' => 'Luke',
                'last_name' => 'Smorgon'
            ]
        ];

		foreach($users as $user)
		{
			Sentry::getUserProvider()->create($user);
		}
	}
}