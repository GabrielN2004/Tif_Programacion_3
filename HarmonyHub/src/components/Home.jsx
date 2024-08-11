import  Navbar  from "./Navbar";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <section id="features" className="section">
                <div className="container">
                    <h2 className="title">Features</h2>
                        <div className="columns">
                            <div className="column">
                                <div className="box">
                                    <h3 className="title is-4">Discover New Music</h3>
                                    <p>Explore a wide variety of music genres and discover new favorites.</p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <h3 className="title is-4">Create Playlists</h3>
                                    <p>Build and share your own playlists with friends.</p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <h3 className="title is-4">Live Streaming</h3>
                                    <p>Enjoy live music events and connect with artists in real-time.</p>
                                </div>
                            </div>
                        </div>

                </div>
            </section>
        </div>
    );
}
