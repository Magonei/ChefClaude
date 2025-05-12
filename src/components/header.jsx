import logo from "../images/chef-claude-icon.png"

export default function header() {
    return (
        <header>
            <img src={logo} className="logo" alt="logo"/>
            <span className="appName">Chef Claude</span>
        </header>
    )
}
