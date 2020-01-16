import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import FilterSection from './components/FilterSection';
import { connect } from 'react-redux';
import { seachQuestionString } from './actions';
import { getTopTags } from './apis';



function App(props) {
  console.log(props)
  const [value, setValue] = useState({
    searchString: '',
    tags: [],
    error: null,
    selectedTag: null,
    score: false,
    unanswered: false,
    accepted: false
  });
  useEffect(() => {
    getTopTags().then(data => {
      let reducedData = data.items.map(data => ({
        name: data.name
      }))
      setValue({
        ...value,
        tags: reducedData
      });
    })
  }, []);
  const handleChange = (key) => (e) => {
    if (key === 'selectedTag' || key === 'searchString') {
      if (e.target.value === '') {
        setValue({
          ...value,
          error: 'Empty String not allowed'
        })
      }
      setValue({
        ...value,
        error: null,
        [key]: e.target.value
      })
    } else {
      setValue({
        ...value,
        error: null,
        [key]: e.target.checked
      })
    }
  }
  const searchHandler = (e) => {
    e.preventDefault();
    if (value.searchString) {
      debugger;
      let cache_res = props.cachedSearchResults;
      let cachedResult = cache_res.reduce((acc,cac) => {
        if(cac.string === value.searchString){
          return cac.results;
        }
      },null);

      if(cachedResult){
        props.seachQuestionString({
          string: value.searchString,
          results: cachedResult
        });
      }else{
        props.seachQuestionString({
          string: value.searchString,
          tag: value.selectedTag,
          score: value.score,
          unanswered: value.unanswered,
          accepted: value.accepted
        });
      }
    } else {
      setValue({
        ...value,
        error: "Empty not allowed"
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stackoverflow proxy</h1>
      </header>
      <div className="searchbar-wrapper">
        <SearchBar error={value.error} searchHandler={searchHandler} str={value.searchString} handleChange={handleChange} />
        <FilterSection value={value} handleChange={handleChange} />
      </div>
      {props.searchResults.map((result,index) => <SearchResults {...result} key={index}/>)}
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  seachQuestionString
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
