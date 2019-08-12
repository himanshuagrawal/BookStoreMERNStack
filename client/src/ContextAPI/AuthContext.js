import React from 'react';

 const context = React.createContext();
 const AuthProvider = context.Provider;
 const AuthConsumer = context.Consumer;

 export {context,AuthProvider,AuthConsumer}