import React from 'react'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid pt-0 pb-0 ms-4 me-4">
                <a className="navbar-brand fs-2" href="#">EC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active fs-4 ms-3" aria-current="page" href="#">Home</a>
                        <a className="nav-link disabled fs-4 ms-3">Products</a>
                        <a className="nav-link disabled fs-4 ms-3">About</a>
                        <a className="nav-link disabled fs-4 ms-3">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar