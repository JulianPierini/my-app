import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from '@material-ui/core/Select';

class CollaboratorAdd extends Component {

  emptyItem = {
    cpf: '', 
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    sectorId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      sectors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSectors = this.getSectors.bind(this);
  }

  async getSectors() {
    console.log('entrou')
    const sectorsList = await fetch(`/sector`).json();   
    this.setState({item: {}, sectors: sectorsList})
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item: item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/collaborator', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/collaborators');
  }

  render() {
      console.log(this.state)
    const {item, sectors} = this.state;
    console.log(sectors);
    const title = <h2>Adicionar Colaborador</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Nome</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="cpf">CPF</Label>
            <Input type="text" name="cpf" id="cpf" value={item.cpf || ''}
                   onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Telefone</Label>
            <Input type="text" name="phone" id="phone" value={item.phone || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="email">Email</Label>
              <Input type="text" name="email" id="emailemail" value={item.email || ''}
                     onChange={this.handleChange} />
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="birthDate">Data de nascimento</Label>
              <Input type="date" name="birthDate" id="birthDate" value={item.birthDate || ''}
                     onChange={this.handleChange} />
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
                <Select value={sectors}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/collaborators">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CollaboratorAdd);