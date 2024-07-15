import React from 'react';
import './Main.css';
import Aside from '../Aside/Aside';
import Nav from '../Nav/Nav';
import Task from '../Task/Task';

const Main = () => {
  return (
    <div>
      <Aside />
      <Nav />
      <Task />
    </div>
  );
};

export default Main;
