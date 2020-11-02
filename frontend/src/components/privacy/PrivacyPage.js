import react, {Component} from 'react';


export class PrivacyPage extends Component {
    

    render(){
        return(
            <div className = "privPage">
                <title>Privacy Page</title>
                <h1>Here you can adjust your privacy settings</h1>
                <h1>Privacy</h1>

                <h2>Show email:</h2>
                <sub>This option will show your email on your page</sub>
                <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>

                <h3>Private page:</h3>
                <sub>This option will hide your page from people who do not follow you</sub>
                <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>

                <button type="button">Save</button>
            </div>
        );
    }

}

export default PrivacyPage;