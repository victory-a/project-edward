import React from 'react';

const SignIn = () => {
    return (  
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80" >
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                        <legend className="center f2 fw4 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="b--blue pa2 input-reset ba bg-transparent  w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b--blue pa2 input-reset ba bg-transparent w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="ph3 pv2 input-reset ba b--blue bg-transparent grow pointer f6 dib" type="submit"value="Sign in" />
                    </div>
                    <div className="lh-copy mt3 center">
                        <p className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>   
)
}

export default SignIn;