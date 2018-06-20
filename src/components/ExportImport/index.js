import db from "../../modules/db";
import { shortFormatDate } from "../../modules/formatter";
import Icon from "../Icon";

const exportData = () => {
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
};

const onFileSelected = e => {
  const reader = new FileReader();
  reader.onload = () => importData(reader.result);
  reader.readAsText(e.target.files[0]);
};

const importData = data => {
  try {
    const parsed = JSON.parse(data);
    db.import(parsed).catch(e => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

const ExportImport = () => (
  <div class="export-import">
    <div class="export" onClick={exportData}>
      <Icon name="download3" />
    </div>
    <div class="import">
      <label>
        <Icon name="upload3" />
        <input type="file" onChange={onFileSelected} />
      </label>
    </div>
  </div>
);

export default ExportImport;
