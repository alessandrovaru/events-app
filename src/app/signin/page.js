
import signIn from "@/firebase/auth/signin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function Page() {
    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign in</h1>
            <form 
            action={
                async (formData) => {
                    'use server';
                    const { result, error } = await signIn(formData.get('email'), formData.get('password')); 
                    if (error) {
                        cookies().set('error', error);
                        return redirect('/signin');
                    }
                    cookies().delete('error');
                    return redirect('/admin');
        
                }
            }
            className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>

    </div>);
}

export default Page;