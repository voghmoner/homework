import React, { Component } from "react";
// import Dropdown from "./Dropdown";
// import logo from './logo.svg';
import "./App.css";

const API_KEY = "537da9d6f34ffaaa0b349c90cabb913b";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      clicked: false,
      showResults: false,
      results: []
    };
  }

  getInfo() {
    this.setState({
      showResults: true
    });
  }

  getQuery() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.query}`
    )
      .then(res => res.json())
      .then(result => {
        // console.log("yay");
        this.setState({
          isLoaded: true,
          results: result.results.splice(0, 8)
        });
      });
  }

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },

      () => {
        // console.log(this.search.value);
        if (this.state.query && this.state.query.length >= 1) {
          this.getInfo();
          if (this.state.query.length >= 3) {
            console.log("Res");
            this.getQuery();
            if (this.state.clicked) {
              this.search.value = "CHANGED";
            }
          }
        } else if (!this.state.query || this.state.query.length === 0) {
          this.setState({
            results: [],
            showResults: false
          });
        }
      }
    );
  };

  handleClick = (mouse, title, rating, date) => {
    this.setState({
      clicked: mouse,
      clickedTitle: title,
      clickedRating: rating,
      clickedDate: date
    });
  };

  render() {
    const { results, showResults, clicked } = this.state;

    const inputClass = showResults ? "search" : "";
    const inputClass1 = showResults ? "search" : "container";

    let input = "";
    const inputCal = () => {
      if (!showResults) {
        input = (
          <input
            placeholder="Enter movie name"
            ref={input => {
              this.search = input;
            }}
            onChange={this.handleInputChange}
          />
        );
      } else {
        if (clicked) {
          input = (
            <div className={inputClass1}>
              <h3>{this.state.clickedTitle}</h3>
              <span>
                {this.state.clickedRating} {"Rating,"} {this.state.clickedDate}
              </span>
            </div>
          );
        } else {
          input = (
            <input
              placeholder="Search for..."
              ref={input => {
                this.search = input;
              }}
              onChange={this.handleInputChange}
              className={inputClass1}
            />
          );
        }
      }
      return input;
    };

    return (
      // <div className="inputQuery">
      <div className="sur">
        <div className={"wrapper"}>
          <div className={"container"}>{inputCal()}</div>
        </div>

        <div className={inputClass}>
          {results.map(item => (
            <a
              key={item.id}
              href="/#"
              data-item={item}
              onMouseOver={() =>
                this.handleClick(
                  true,
                  item.title,
                  item.vote_average,
                  item.release_date.split("-")[0]
                )
              }
            >
              <h3>{item.title}</h3>
              <span style={{ fontWeight: "normal" }}>
                {item.vote_average} {"Rating,"}{" "}
                {item.release_date.split("-")[0]}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
