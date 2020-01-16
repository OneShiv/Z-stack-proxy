import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import FilterSection from './components/FilterSection';
import { connect } from 'react-redux';
import { seachQuestionString } from './actions';
import { getTopTags } from './apis';
import Modal from './components/Modals';
import ReactHtmlParser from 'react-html-parser';


function App(props) {
  const [open, setOpen] = useToggle(false);
  const [value, setValue] = useState({
    searchString: '',
    tags: [],
    error: null,
    selectedTag: null,
    score: false,
    unanswered: false,
    accepted: false,
    clickedPost: null,
    tagsLoading: true,
    resultsLoading: false
  });
  useEffect(() => {
    setValue({
      ...value,
      tagsLoading: true
    })
    getTopTags().then(data => {
      let reducedData = data.items.map(data => ({
        name: data.name
      }))
      setValue({
        ...value,
        tags: reducedData,
        tagsLoading: false
      });
    })
  }, []);
  function useToggle(initialValue = false) {
    const [toggle, setToggle] = useState(initialValue)

    return [toggle, useCallback(() => setToggle(status => !status), [])]
  }
  const handleChange = (key) => (e) => {
    if (key === 'selectedTag' || key === 'searchString') {
      if (e.target.value === '') {
        setValue({
          ...value,
          error: 'Empty String not allowed'
        })
      }
      setValue(() => ({
        ...value,
        error: null,
        [key]: e.target.value
      }));
      if (key === 'selectedTag') {
        searchHandler(e);
      }
    } else {
      setValue({
        ...value,
        error: null,
        [key]: e.target.checked
      });
      searchHandler(e);
    }
  }
  const searchHandler = (e) => {
    e.preventDefault();

    let complexString = `${value.searchString}${value.selectedTag}${value.score}${value.unanswered}${value.accepted}`;
    if (value.searchString) {
      let cache_res = props.cachedSearchResults;
      let cachedResult = cache_res.reduce((acc, cac) => {
        if (cac.string === complexString) {
          return cac.results;
        }
      }, null);

      if (cachedResult) {
        props.seachQuestionString({
          string: complexString,
          results: cachedResult
        });
      } else {
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
  const clickPostHandler = (post) => {
    setValue({
      ...value,
      clickedPost: post
    });
    setOpen(true);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stackoverflow proxy</h1>
      </header>
      <div className="searchbar-wrapper">
        <SearchBar error={value.error} searchHandler={searchHandler} str={value.searchString} handleChange={handleChange} />
        <FilterSection tagsLoading={value.tagsLoading} value={value} handleChange={handleChange} />
      </div>
      {props.searchResults.map((result, index) => <SearchResults resultsLoading={value.resultsLoading} clickPost={clickPostHandler} {...result} key={index} />)}
      {open && (
        <Modal open={open} toggle={setOpen}>
          <h3>{value.clickedPost.title}</h3>
          <p>{ReactHtmlParser(value.clickedPost.body)}</p>
          <div className="author-details">
            <p>Name:{value.clickedPost.owner.display_name}</p>
            <p>Reputation:{value.clickedPost.owner.reputation}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  seachQuestionString
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
