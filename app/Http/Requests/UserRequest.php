<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'bail|required|string|max:255',
            'email' => 'bail|required|email|unique:users',
            'password' => 'bail|required|string|min:8|confirmed',
            'role' => 'bail|required|string|in:admin,finance,regular',
            'salary' => 'bail|nullable|numeric|min:0',
            'profile' => 'bail|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'وارد کردن نام الزامی است',
            'name.string' => 'نام باید یک رشته متنی باشد',
            'name.max' => 'نام نباید بیشتر از ۲۵۵ کاراکتر باشد',

            'email.required' => 'وارد کردن ایمیل الزامی است',
            'email.email' => 'ایمیل وارد شده معتبر نیست',
            'email.unique' => 'این ایمیل قبلا ثبت شده است',

            'password.required' => 'وارد کردن رمز عبور الزامی است',
            'password.string' => 'رمز عبور باید رشته‌ای باشد',
            'password.min' => 'رمز عبور باید حداقل ۸ کاراکتر باشد',
            'password.confirmed' => 'رمز عبور و تکرار آن باید یکسان باشد',

            'role.required' => 'وارد کردن نقش کاربر الزامی است',
            'role.string' => 'نقش کاربر باید یک رشته متنی باشد',
            'role.in' => 'نقش کاربر باید یکی از مقادیر admin، finance یا regular باشد',

            'profile.image' => 'فایل پروفایل باید یک تصویر باشد',
            'profile.mimes' => 'فرمت‌های مجاز تصویر: jpeg، png، jpg، gif',
            'profile.max' => 'اندازه تصویر نباید بیشتر از ۲ مگابایت باشد',
        ];
    }
}
