import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class CityData {
    cityName: string = "";
    cityID: number = 0;
}

interface AddCityDataState {
    title: string,
    loading: boolean,
    cityList: Array<any>;
    cityData: CityData;
}

export class AddCity extends React.Component<RouteComponentProps<{}>, AddCityDataState> {
    constructor(props){
        super();

        this.state = { title: "", loading: true, cityList: [], cityData: new CityData };
        this.saveCity = this.saveCity.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    componentDidMount(){

        fetch('api/Employee/GetCityList')  
            .then(response => response.json() as Promise<Array<any>>)  
            .then(data => {  
                this.setState({ cityList: data });  
            });
        
        var cityID = this.props.match.params["cityid"];

        //sets state for Edit city
        if (cityID > 0){
            fetch('api/Employee/City/Details/' + cityID)
                .then(response => response.json() as Promise<CityData>)
                .then(data => {
                    this.setState({ title: 'Edit', loading: false, cityData: data});
                });
        } else {
            this.state = { title: "Create", loading: false, cityList: [], cityData: new CityData };
        }
    }

    public render() {
        let contents = this.state.loading ? <p><em>Loading..</em></p>:
                        this.renderCreateForm(this.state.cityList);
        
        return <div>
            <h1>{this.state.title}</h1>
            <h3>City</h3>
            < hr />
            {contents}
        </div>;
    }

    private saveCity(event){
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT City
        if(this.state.cityData.cityID) {
            this.update(data);
        }
        // POST (add) City
        else {
            this.add(data);
        }

    }

    private update(formData){
        fetch('api/Employee/City/Edit', {
            method: 'PUT',
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/fetchemployee");
            })
    }

    private add(formData){
        fetch('api/Employee/CreateCity', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/fetchemployee");
            })
    }

    private renderCreateForm(cityList: Array<any>){
        console.log(cityList);
        return (<form onSubmit={this.saveCity}>
            <div className="form-group row">
                <input type="hidden" name="cityID" value={this.state.cityData.cityID} />
            </div >
            <div className="form-group row">
                    <label className="control-label col-md-12" >City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.cityData.cityName}>
                            <option value="">-- Current Cities --</option>
                            {cityList.map(city =>
                                <option key={city.cityID} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
            </div >
            <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="cityName">Name</label>
                    <div className="col-md-4">  
                        <input className="form-control" type="text" name="cityName" defaultValue={this.state.cityData.cityName} required />  
                    </div>             
            </div >
            <div className="form-group">  
                    <button type="submit" className="btn btn-default">Save</button>  
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
            </div>

        </form>
        )
    }

    private handleCancel(e){
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }
}
