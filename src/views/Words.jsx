import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDefinition } from "../actions/definition.actions.js";
import Select from "react-select";

class Words extends Component {
  static propTypes = {
    words: PropTypes.object,
    getDefinition: PropTypes.func,
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool
  };

  static defaultProps = {
    words: {},
    getDefinition: () => null,
    error: null,
    success: "",
    loading: false
  };

  state = {
    inputVal: "",
    selectedOptions: null,
    currentFlashcardIdx: 0,
    showFlashCard: false,
    currentWordDefinition: null,
    showDefinition: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.success !== this.props.success) {
      this.setState({ inputVal: "" });
    }
  }

  handleInputChange = event => {
    this.setState({ inputVal: event.target.value });
  };

  handleSubmit = event => {
    this.props.getDefinition(this.state.inputVal);
    event.preventDefault();
  };

  handleSelectChange = selectedOptions => {
    this.setState({ selectedOptions });
  };

  startFlashCard = () => {
    if (this.state.showFlashCard) {
      this.setState({
        showFlashCard: false,
        currentFlashcardIdx: 0,
        currentWordDefinition: null,
        showDefinition: false
      });
    } else {
      this.setState({ showFlashCard: true });
    }
  };

  toggleWordDefinition = word => {
    if (this.state.showDefinition) {
      this.setState({
        showDefinition: false
      });
    } else {
      this.setState({
        showDefinition: true,
        currentWordDefinition: this.props.words[word]
      });
    }
  };

  getPreviousCard = () => {
    this.setState({
      currentFlashcardIdx: this.state.currentFlashcardIdx - 1,
      showDefinition: false
    });
  };

  getNextCard = () => {
    this.setState({
      currentFlashcardIdx: this.state.currentFlashcardIdx + 1,
      showDefinition: false
    });
  };

  render() {
    const {
      inputVal,
      selectedOptions,
      showFlashCard,
      currentFlashcardIdx,
      currentWordDefinition,
      showDefinition
    } = this.state;
    const { words, error, loading, success } = this.props;
    const options = Object.keys(words).map(function(key) {
      return { label: key, value: key };
    });
    return (
      <div className="container">
        {error ||
          (loading && (
            <span>{error != null ? error : "adding new word..."}</span>
          ))}
        {success.length > 0 && !loading && !error && (
          <span>{`${this.props.success}`} was added!"</span>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="word"
            value={inputVal}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="ADD WORD" />
        </form>
        {Object.keys(words).length > 0 ? (
          <div>
            <h3>Choose words to study</h3>
            <Select
              value={selectedOptions}
              onChange={this.handleSelectChange}
              options={options}
              isMulti
              isSearchable
            />
            {selectedOptions != null && selectedOptions.length > 0 && (
              <button onClick={this.startFlashCard} className="mt-10">
                {showFlashCard ? "STOP" : "START FLASHCARD"}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-10">Add some words please</div>
        )}
        {showFlashCard && (
          <div>
            <div className="flex-row align-center justify-center mt-10 mb-10">
              {currentFlashcardIdx !== 0 && (
                <button onClick={this.getPreviousCard}>BACK</button>
              )}
              <h4>
                {currentFlashcardIdx + 1}/{selectedOptions.length}
              </h4>
              {currentFlashcardIdx < selectedOptions.length - 1 && (
                <button onClick={this.getNextCard}>NEXT</button>
              )}
            </div>
            <div className="flex-column align-center">
              <b className="mb-10">
                {selectedOptions[currentFlashcardIdx].value}
              </b>
              <button
                className="mb-10"
                onClick={() => {
                  this.toggleWordDefinition(
                    selectedOptions[currentFlashcardIdx].value
                  );
                }}
              >
                {showDefinition ? "HIDE DEFINITION" : "SHOW DEFINITION"}
              </button>
            </div>
            {showDefinition && (
              <div className="pre-wrap text-left">{currentWordDefinition}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.words.items,
  error: state.words.error,
  loading: state.words.loading,
  success: state.words.success
});

const mapDispatchToProps = dispatch => ({
  getDefinition: word => dispatch(getDefinition(word))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Words);
