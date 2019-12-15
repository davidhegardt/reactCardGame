import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> {
    constructor() {
        super();
        this.state = {empList: [], loading: true};

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    componentDidMount() {
        fetch('api/Employee/Index')
            .then(response => response.json() as Promise<EmployeeData[]>)
            .then(data => {
                console.log(data);
                this.setState({ empList: data, loading: false });
            }); 
    }

    public render() {
        let contents = this.state.loading ? <p><em>loading...</em></p> :
                        this.renderEmployeeTable(this.state.empList);
        
        return <div>
            <h1>Employee Data</h1>
            <p>component fetching Employee data from BE</p>
            <p>
                <Link to="/addemployee">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    private renderEmployeeTable(empList: EmployeeData[]){
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>EmployeeId</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {empList.map(emp =>  
                    <tr key={emp.employeeID}>  
                        <td></td>
                        <td>{emp.employeeID}</td>  
                        <td>{emp.name}</td> 
                        <td>{emp.department}</td>  
                        <td>{emp.gender}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(emp.employeeID)}>Delete</a>
                            |
                            <a className="action" onClick={(id) => this.handleEdit(emp.employeeID)}>Edit</a>
                        </td>
                    </tr>  
                )}  
            </tbody>
        </table>
    }

    private handleDelete(id: number) {
        if (!confirm("Do you want to delete employee with Id: " + id))  
            return;  
        else {  
            fetch('api/Employee/Delete/' + id, {  
                method: 'delete'  
            }).then(data => {  
                this.setState(  
                    {  
                        empList: this.state.empList.filter((rec) => {  
                            return (rec.employeeID != id);  
                        })  
                    });  
            });  
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }
}

export class EmployeeData {
    employeeID: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}