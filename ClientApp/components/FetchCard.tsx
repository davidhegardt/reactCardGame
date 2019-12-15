import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { default as Card } from './Card';

interface FetchCardDataState {
    cardList: CardData[];
    loading: boolean;
    animated: boolean;
    bengt: boolean;
}

export class FetchCard extends React.Component<RouteComponentProps<{}>, FetchCardDataState> {
    constructor(){
        super();
        this.state = {cardList: [],loading: true, animated: false, bengt: false};

        this.shuffle = this.shuffle.bind(this);
        this.tryAnim = this.tryAnim.bind(this)
    }

    doneYet = false;

    componentDidMount() {
        // api call here
        fetch('api/Cards/GetCard')
            .then(response => response.json() as Promise<CardData[]>)
            .then(data => {
                console.log(data);
                this.setState({ cardList: data, loading: false });
            });
        this.shuffle();
    }

    private shuffle(){

        //   let animationState = !this.state.animated; 
        //   this.setState({animated: animationState});
    
            let array = this.state.cardList; 
                  let i = array.length - 1;
                   for (; i > 0; i--) {
                     const j = Math.floor(Math.random() * (i + 1));
                     const temp = array[i];
                     array[i] = array[j];
                     array[j] = temp;
                   }
        
           //this.setState({ cardList: array});     
             return array;    
    }
    
    private tryAnim(){
        //this.setState({cardList: this.shuffle()})
        let animationState = !this.state.animated; 
        this.setState({animated: animationState});
        //this.setState({cardList: this.shuffle()})
    }
    

    public render() {
        let contents = this.state.loading ? <p><em>loading cards..</em></p> :
                        this.renderCardList(this.shuffle());
                        //this.setState({animationCompleted: true});
                        this.doneYet = true;
        return <div>
            <h1>Card List</h1>
            {contents}
            <button className="action" onClick={this.tryAnim}>Shuffle</button>
            <div className="square1"></div>
            <div className="square2"></div>
        </div>
        
    }

    private getRows(cardlist : CardData[], endvalue){        
        let row = cardlist.slice(endvalue - 4,endvalue);
        return row;
    }

    private tryRender(innerlist: CardData[], index){
        const divStyle = {
            maxWidth: '18rem'
        }

        const imgStyle = {
            width: '100%',
            margin: 'auto'
        }

        const imgCardStyle = {
            maxWidth: '12rem',
            padding: '10px'
        }

        return <div key={index} className="card-deck">
                 {innerlist.map(card =>                     
                    <div key={card.cardID} className="card text-white bg-light mb-3 pop homecard-container" style={imgCardStyle}>
                        <div className="card-header bg-info mb-3 pop-light">{card.name}</div>
                        <div className={this.state.animated ? 'fade' : 'homecard'} onAnimationEnd= {() => this.setState({animated: false})}>
                            <img className="card-img-top img-responsive framsida" style={imgStyle} src={card.imageURL} alt="Card image cap" />
                            <div className="baksida">
                                <h1>Goodbye</h1>
                            </div>
                        </div>
                    </div>                
                 )}
                 </div>
    }
    private getCardClassName() {
        if (this.state.animated){
            return 'homecard animate-test';
        } else return 'homecard';
    }

    private renderCardList(cardList: CardData[]){
        const divStyle = {
            maxWidth: '18rem'
        }

        const imgStyle = {
            width: '100%',
            margin: 'auto'
        }

        const imgCardStyle = {
            maxWidth: '12rem',
            padding: '10px'
        }

        let first = 4;
        let masterList: CardData[][] = [];
        for(let i = 0; i < 13;i++){            
            let row = this.getRows(cardList,first);
            masterList.push(row);
            first += 4;
        }
        let content : JSX.Element[] = [] ;
        for(let i = 0; i < 13;i++){            
            content.push(this.tryRender(masterList[i],i));
        }
        
        console.log(masterList);
        return <div>{content}</div>

    }

}

export class CardData {
    cardID: number = 0;
    name: string = "";
    value: string = "";
    imageURL: string = "";
}