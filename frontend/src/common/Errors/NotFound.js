import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>Упс...</h1>
    <h2>Страница не найдена</h2>
    <Link to="/clients">
      Вернутся к таблице
    </Link>
  </div>
);

export default NotFound;