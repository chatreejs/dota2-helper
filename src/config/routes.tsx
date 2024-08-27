import { RoshanTimer } from '@views';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/roshan-timer'} />} />
      <Route path="/roshan-timer" element={<RoshanTimer />} />
    </Routes>
  );
};

export default AppRoutes;
