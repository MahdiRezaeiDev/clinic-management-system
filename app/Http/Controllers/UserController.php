<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return  Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function create(): Response
    {
        return  Inertia::render('User/Create');
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $validated =  $request->validated();

        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];
        $user->password = bcrypt($validated['password']);

        if ($request->hasFile('profile') && $request->file('profile')->isValid()) {
            $path = $request->file('profile')->store('profiles', 'public');
            $user->profile = $path;
        }

        $user->save();
        return redirect()->back();
    }

    public function edit(User $user): Response
    {
        return Inertia::render('User/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,finance,regular',
            'password' => 'nullable|string|min:8|confirmed',
        ], [
            'name.required' => 'وارد کردن نام الزامی است.',
            'email.required' => 'وارد کردن ایمیل الزامی است.',
            'email.email' => 'ایمیل وارد شده معتبر نیست.',
            'email.unique' => 'این ایمیل قبلا ثبت شده است.',
            'role.required' => 'وارد کردن نوع کاربر الزامی است.',
            'password.min' => 'رمز عبور باید حداقل 8 کاراکتر باشد.',
            'password.confirmed' => 'رمز عبور و تکرار آن باید یکسان باشد.',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = $request->password && Hash::make($request->password);
        $user->save();
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back();
    }
}
