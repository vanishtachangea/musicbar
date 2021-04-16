import React, {Component} from "react";
import Artist from "./Artist";
import Tracks from "./Tracks";
import Search from "./Search";

const API_URL = "https://spotify-api-wrapper.appspot.com";

class App extends Component {
  state = {artist: null, tracks: []};

  componentDidMount() {
    this.searchArtist("Michael Jackson");
  }

  searchArtist = (artistQuery) => {
    let response = fetch(`${API_URL}/artist/${artistQuery}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.artists.total > 0) {
          const artist = result.artists.items[0];

          this.setState({artist});

          fetch(`${API_URL}/artist/${artist.id}/top-tracks`)
            .then((response) => response.json())
            .then((json) => {
              this.setState({tracks: json.tracks});
            })
            .catch((error) => alert(error.message));
        }
      })
      .catch((error) => alert(error.message));
  };
  render() {
    console.log("this.state", this.state);
    return (
      <div>
        <h2> Music Bar</h2>
        <Search searchArtist={this.searchArtist} />
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;
