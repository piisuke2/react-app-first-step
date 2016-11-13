import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as b from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      csv: [],
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {this.renderExample()}
      </div>
    );
  }

  renderExample() {
    return (
      <div style={{ width: 950, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
          <b.Panel bsStyle="primary" header={<h3>React-Bootstrap Example</h3>}>
            <div style={{ marginBottom: 10 }}>
              <a href="https://react-bootstrap.github.io/components.html">Reference</a>
            </div>
            <b.Panel header={<h3>Input form example</h3>}>
              {this.renderInputForm()}
            </b.Panel>

            <b.Panel header={<h3>CSV file example</h3>}>
              {this.renderCsvFile()}
            </b.Panel>
          </b.Panel>
      </div>
    );
  }

  renderInputForm() {
    return (
      <form>
        <b.FormGroup controlId="text">
          <b.ControlLabel>Text</b.ControlLabel>
          <b.FormControl
            type="text"
            value={this.state.text}
            onChange={(e) => {this.setState({ text: e.target.value })}}
            placeholder="Enter text"
          />
        </b.FormGroup>

        <b.Button
          bsStyle="primary"
          type="button"
          onClick={(v) => {alert(this.state.text)}}
          style={{ marginBottom: 10 }}
        >
          Alert text message
        </b.Button>

        <b.FormGroup controlId="pass">
          <b.ControlLabel>Password</b.ControlLabel>
          <b.FormControl
            type="password"
            placeholder="Enter password"
          />
        </b.FormGroup>

        <b.FormGroup controlId="file">
          <b.ControlLabel>File</b.ControlLabel>
          <b.FormControl
            type="file"
          />
          <b.HelpBlock>Help message.</b.HelpBlock>
        </b.FormGroup>

        <b.Checkbox checked readOnly>
          Checkbox
        </b.Checkbox>
        <b.Radio checked readOnly>
          Radio
        </b.Radio>

        <b.FormGroup>
          <b.Checkbox inline>
            1
          </b.Checkbox>
          {' '}
          <b.Checkbox inline>
            2
          </b.Checkbox>
          {' '}
          <b.Checkbox inline>
            3
          </b.Checkbox>
        </b.FormGroup>
        <b.FormGroup>
          <b.Radio inline>
            1
          </b.Radio>
          {' '}
          <b.Radio inline>
            2
          </b.Radio>
          {' '}
          <b.Radio inline>
            3
          </b.Radio>
        </b.FormGroup>

        <b.FormGroup controlId="formControlsSelect">
          <b.ControlLabel>Select</b.ControlLabel>
          <b.FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            <option value="other">...</option>
          </b.FormControl>
        </b.FormGroup>
        <b.FormGroup controlId="formControlsSelectMultiple">
          <b.ControlLabel>Multiple select</b.ControlLabel>
          <b.FormControl componentClass="select" multiple>
            <option value="select">select (multiple)</option>
            <option value="other">...</option>
          </b.FormControl>
        </b.FormGroup>

        <b.FormGroup controlId="formControlsTextarea">
          <b.ControlLabel>Textarea</b.ControlLabel>
          <b.FormControl componentClass="textarea" placeholder="textarea" />
        </b.FormGroup>

        <b.FormGroup>
          <b.ControlLabel>Static text</b.ControlLabel>
          <b.FormControl.Static>
            email@example.com
          </b.FormControl.Static>
        </b.FormGroup>
      </form>
    );
  }

  getCsvString() {
    let csv = '';
    for (let i=0; i < this.state.csv.length; ++i) {
      csv += `${this.state.csv[i].id},${this.state.csv[i].name}\n`;
    }
    return csv;
  }
  setCsvString(csvString) {
    const csv = [];
    const list = csvString.replace(/\r\n/,'\n').split('\n');
    for (let i=0; i < list.length; ++i) {
      const cols = list[i].split(',');
      if (cols[0]) {
        csv.push({ id: cols[0], name: cols[1] });
      }
    }
    this.setState({ csv });
  }

  renderCsvFile() {
    return (
      <div>
        <form>
          <b.FormGroup controlId="csv">
            <b.ControlLabel>Import CSV File</b.ControlLabel>
            <b.FormControl
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                const fr = new FileReader();
                fr.onload = (e) => {
                  this.setCsvString(fr.result);
                }
                fr.readAsText(file);
              }}
            />
            <b.HelpBlock>exmple.csvを選択してください</b.HelpBlock>
          </b.FormGroup>
        </form>

        <ReactDataGrid
          enableCellSelect
          columns={[
            {
              key: 'id',
              name: 'ID',
              width: 80,
            },
            {
              key: 'name',
              name: 'NAME（編集可）',
              editable : true,
            },
          ]}
          rowGetter={(idx) => this.state.csv[idx]}
          rowsCount={this.state.csv.length}
          onRowUpdated={(e) => {
            const csv = this.state.csv;
            Object.assign(csv[e.rowIdx], e.updated);
            this.setState({ csv });
          }}
        />

        <a
          id="download"
          href="#"
          download="download.csv"
          onClick={(e) => {
            const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            const content = this.getCsvString();
            const blob = new Blob([ bom, content ], { "type" : "text/csv" });
            if (window.navigator.msSaveBlob) {
              window.navigator.msSaveBlob(blob, "download.csv");
            } else {
              e.target.href = window.URL.createObjectURL(blob);
            }
          }}
        >
          CSVダウンロード
        </a>
        <br />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem('csv', this.getCsvString());
          }}
        >
          localStorageに保存
        </a>
        <br />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (localStorage.csv) {
              this.setCsvString(localStorage.csv);
            }
          }}
        >
          localStorageから読み込み
        </a>
      </div>
    );
  }
}
