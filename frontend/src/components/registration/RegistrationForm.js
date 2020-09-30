import React, { Component } from 'react'

export class RegistrationForm extends Component {
    render() {
        return (
            <div>
                {/* REGISTRATION SECTION */}
                <div>
                    <form>
                        {/* email, username, password*/}
                        <div class="form-group">
                            <label for="emailInput">Email</label>
                            <input type="email" class="form-control" id="emailInput" />
                        </div>
                        <div class="form-group">
                            <label for="uesernameInput">Username</label>
                            <input type="username" class="form-control" id="uesernameInput" />
                        </div>
                        <div class="form-group">
                            <label for="passwordInput">Password</label>
                            <input type="password" class="form-control" id="passwordInput" />
                        </div>

                        {/* security questions */}
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Security Question 1
                        </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">What is you mother's maiden name?</a>
                                <a class="dropdown-item" href="#">What city were you born in?</a>
                                <a class="dropdown-item" href="#">What is your favorite movie?</a>
                                <a class="dropdown-item" href="#">What year did you finish high school?</a>
                                <a class="dropdown-item" href="#">What is your favorite food?</a>
                            </div>
                            <div class="form-group">
                                <label for="answer1Input">Answer 1</label>
                                <input type="answer" class="form-control" id="answer1Input" />
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Security Question 2
                        </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">What is you mother's maiden name?</a>
                                <a class="dropdown-item" href="#">What city were you born in?</a>
                                <a class="dropdown-item" href="#">What is your favorite movie?</a>
                                <a class="dropdown-item" href="#">What year did you finish high school?</a>
                                <a class="dropdown-item" href="#">What is your favorite food?</a>
                            </div>
                            <div class="form-group">
                                <label for="answer2Input">Answer 2</label>
                                <input type="answer" class="form-control" id="answer2Input" />
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Security Question 3
                        </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">What is you mother's maiden name?</a>
                                <a class="dropdown-item" href="#">What city were you born in?</a>
                                <a class="dropdown-item" href="#">What is your favorite movie?</a>
                                <a class="dropdown-item" href="#">What year did you finish high school?</a>
                                <a class="dropdown-item" href="#">What is your favorite food?</a>
                            </div>
                            <div class="form-group">
                                <label for="answer3Input">Answer 3</label>
                                <input type="answer" class="form-control" id="answer3Input" />
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Register!</button>
                    </form>


                </div>

                {/* LOGIN SECTION */}
                <div>
                    <form>
                        {/* email/username, password*/}
                        <div class="form-group">
                            <label for="emailOrUsernameInput">Email or Username</label>
                            <input class="form-control" id="emailInput" />
                        </div>
                        <div class="form-group">
                            <label for="passwordInput">Password</label>
                            <input type="password" class="form-control" id="passwordInput" />
                        </div>
                    </form>
                    <button type="submit" class="btn btn-danger">forgot password</button>
                    <div></div>
                    <button type="submit" class="btn btn-primary">login</button>
                </div>
            </div>
        )
    }
}

export default RegistrationForm
