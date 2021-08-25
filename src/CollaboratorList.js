import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CollaboratorList extends Component {

  constructor(props) {
    super(props);
    this.state = {collaborators: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    const response = await fetch('/collaborator');
    const body = await response.json();

    this.setState({ collaborators: body, isLoading: false });
  }

  async remove(cpf) {
    await fetch(`/collaborator/${cpf}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedcollaborators = [...this.state.collaborators].filter(i => i.cpf !== cpf);
      this.setState({collaborators: updatedcollaborators});
    });
  }

  render() {
    const {collaborators, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const sectors = Object.keys(collaborators);

    const CollaboratorList = sectors.map(sector => {
      return collaborators[sector].map(collaborator => {
      const name = `${collaborator.name || ''}`;
      const email = `${collaborator.email || ''}`;
      const age = `${collaborator.age || ''}`;
      const sectorDescription = `${collaborator.sectorDescription || ''}`;
      
      return <tr> 
        <td>{sectorDescription}</td>
        <td>{name}</td> 
        <td>{email}</td> 
        <td>{age}</td>      
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.remove(collaborator.cpf)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>;
      })
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/collaborators/new">Add collaborator</Button>
          </div>
          <h3>Colaboradores</h3>
          <Table className="mt-4">
            <thead>
            <tr>
            <th width="20%">Setor</th>
              <th width="20%">Nome</th>
              <th width="20%">Email</th>
              <th width="10%">Idade</th>
              <th width="10%"></th>
            </tr>
            </thead>
            <tbody>
            {CollaboratorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CollaboratorList;