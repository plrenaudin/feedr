import { linkEvent, Component } from "inferno";
import db from "../../modules/db";
import { shortFormatDate } from "../../modules/formatter";

class ExportImport extends Component {
  constructor(props) {
    super(props);
    this.state = { displayInput: false };
  }

  exportData() {
    db
      .getAll()
      .then(data => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `feedrExport-${shortFormatDate()}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      })
      .catch(e => console.error(e));
  }

  toggleInput(instance) {
    instance.setState({ displayInput: !instance.state.displayInput });
  }

  onFileSelected(instance, e) {
    const reader = new FileReader();
    reader.onload = () => instance.importData(reader.result);
    reader.readAsText(e.target.files[0]);
  }

  importData(data) {
    try {
      const parsed = JSON.parse(data);
      db.import(parsed).catch(e => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div class="export-import">
        <div class="export" onClick={linkEvent(this, this.exportData)}>
          <i class="fas fa-download" />
        </div>
        <div class="import" onClick={linkEvent(this, this.toggleInput)}>
          <i class="fas fa-upload" />
          {this.state.displayInput && (
            <input type="file" onChange={linkEvent(this, this.onFileSelected)} />
          )}
        </div>
      </div>
    );
  }
}

export default ExportImport;
