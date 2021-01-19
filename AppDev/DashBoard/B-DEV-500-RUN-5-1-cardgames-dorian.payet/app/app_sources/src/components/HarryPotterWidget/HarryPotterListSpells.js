import React from 'react';

class HarryPotterListOfSpells extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spells_List : []
        };
    }
    updateSpellsList(list) {
        var tab = [];
        let i = 0;

        list.forEach(elem => {
            tab.push(
                <tr key={i} >
                <th scope="row">{elem.spell}</th>
                <td>{elem.type}</td>
                <td>{elem.effect}</td>
                </tr>
            );
            i++;
        });
        this.setState({ Spells_List: tab });
    }
    listSpellsRequest() {
        fetch('https://www.potterapi.com/v1/spells?key=$MY_HARRY_POTTER_ID')
        .then(res => res.json())
        .then((data) => {
            this.updateSpellsList(data)
        });
    }
    render() {
        return (
            <div>
                <h2 key={0} >Here you can list every known spells</h2>
                <button onClick={() => this.listSpellsRequest()} key={1} >List All existing spells</button>
                <table className="table" key={3} >
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Effect</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Spells_List}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HarryPotterListOfSpells;