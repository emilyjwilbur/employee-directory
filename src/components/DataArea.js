import React, { Component } from 'react';
import API from '../utils/API';
import Nav from './Nav';
import DataTable from './DataTable';



export default class DataArea extends Component {

    state = {
        users:[{}],
        order: "descend",
        filteredUsers: [{}]
    }


    headings = [
        {name: "Image", width: "10%"},
        {name: "Name", width: "10%"},
        {name: "Phone", width: "20%"},
        {name: "Email", width: "20%"},
        {name: "DOB", width: "10"}

    ]


    handleSort = heading => {
        if(this.state.order === "descend") {
            this.setState({
                order:"ascend"
            })
        }else {
            this.setState({
                order: "descend"
            })
        }


        const compareFnc = (a, b) => {
            // if no values
            if (this.state.order === "ascend") {
                if (a[heading] === undefined) {
                    return 1;
                }else if (b[heading] === undefined) {
                    return -1;
                }

                else if (heading === "name") {
                    return a[heading].first.localCompare(b[heading].first);
                } else {
                    return a[heading] - b[heading];
                }
            } else {
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;

                }

                else if (heading === "name") {
                    return b[heading].first.localCompare(a[heading].first);
                } else {
                    return b[heading] - a[heading];
                }
            }
        }


        const sortedUsers = this.state.filteredUsers.sort(compareFnc);
        this.setState({filteredUsers: sortedUsers });

    }

    handleNewSearch = event => {
        // console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = this.state.users.filter(item => {
            let values = Object.values(item)
            .join("")
            .toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({filteredUsers: filteredList});
    }


    componentDidMount() {
        // console.log("testing")
        API.getUsers().then(results => {
            this.setState({
                users: results.data.results,
                filteredUsers: results.data.results
            });
        });
    }


    render () {
        return(
            <div>

                <Nav handleNewSearch={this.handleNewSearch} />
                <div className="data-area">
                    <DataTable headings={this.headings} users={this.state.filteredUsers} handleSort={this.handleSort} />
                </div>

            </div>
        )
    }
}