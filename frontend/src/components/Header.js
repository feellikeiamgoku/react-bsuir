import '../Header.css'

import HeaderButton from "./HeaderButton"

function Header() {
    return (
        <header className="Header">
            <div className="container">
                <h1 className="mh-logo">
			        <img src="https://rbank.by/local/templates/html_dev/images/logo.svg" width="162" height="44" alt="Bank Solution"></img>
		        </h1>
            <nav className="main-nav">
                <ul className="main-nav-list">
                    <HeaderButton link="/clients" linkName="Клиенты"></HeaderButton>
                    <HeaderButton link="/deposits" linkName="Депозиты"></HeaderButton>
                    <HeaderButton link="/credits" linkName="Кредиты"></HeaderButton>

                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;