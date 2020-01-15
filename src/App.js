import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { connect } from 'react-redux';
import { seachQuestionString } from './actions';

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stackoverflow proxy</h1>
      </header>
      <SearchBar onSearch={props.seachQuestionString} />
      {props.searchResults.map(result => <SearchResults {...result} />)}
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  seachQuestionString
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
