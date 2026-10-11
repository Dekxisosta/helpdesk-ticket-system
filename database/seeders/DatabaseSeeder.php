<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Idempotent: safe to run on every deploy.
        $user = User::firstOrCreate(
            ['email' => 'demo@helpdesk.test'],
            ['name' => 'Demo User', 'password' => Hash::make('Demo@12345')],
        );

        if ($user->tickets()->exists()) {
            return;
        }

        $samples = [
            ['Laptop will not boot', 'Laptop shows a black screen after the logo since this morning.', 'High', 'Open', 'Hardware'],
            ['VPN keeps disconnecting', 'VPN drops every ten minutes when working from home.', 'Urgent', 'In Progress', 'Network'],
            ['Install design software', 'Need the latest design suite installed on workstation 4.', 'Low', 'Open', 'Software'],
            ['Reset email password', 'Locked out of the shared mailbox after too many attempts.', 'Medium', 'Resolved', 'Account'],
            ['Replace broken mouse', 'The left button on the office mouse no longer registers clicks.', 'Low', 'Closed', 'Hardware'],
        ];

        foreach ($samples as [$title, $description, $priority, $status, $category]) {
            $user->tickets()->create(compact('title', 'description', 'priority', 'status', 'category'));
        }
    }
}
