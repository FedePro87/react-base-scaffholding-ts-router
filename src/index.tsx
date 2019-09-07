import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="banner">
        <span className="banner__text">
          Hello {this.props.name}!
        </span>
      </div>
    );
  }
}

class One extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>PAGE ONE</div>
      </div>
    );
  }
}

class Two extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>PAGE TWO</div>
      </div>
    );
  }
}

class Three extends React.Component<any, any> {
  constructor (props : any) {
    super(props);
    this.state = {
      text : '',
      loading : true
    }

    axios.get('https://api.github.com/users/maecapozzi')
    .then((response : any) => this.setState({ text : response.data.updated_at, loading : false}));
  }

  render() {
    let content;

    if (this.state.loading) {
      content = 'CARICAMENTO'
    } else {
      content = <h5>{this.state.text}</h5>
    }

    return (
      <div>
        <div>PAGE THREE</div>
        {content}
      </div>
    );
  }
}

 function AppRouter() {
   return (
     <Router>
       <div>
         <nav>
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/one">Page one</Link>
             </li>
             <li>
               <Link to="/two">Page two</Link>
             </li>
             <li>
               <Link to="/three">Page Three</Link>
             </li>
           </ul>
         </nav>

         <Route path="/" exact component={(props : any) => <Home name="Federico" {...props} />} />
         <Route path="/one" component={One} />
         <Route path="/two" component={Two} />
         <Route path="/three" component={Three} />
       </div>
     </Router>
   );
 }

 export default AppRouter;

ReactDOM.render(<AppRouter/>, document.getElementById('app'));
