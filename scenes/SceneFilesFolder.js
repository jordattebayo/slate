import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import DataMeter from "~/components/core/DataMeter";

const POLLING_INTERVAL = 10000;

export default class SceneFilesFolder extends React.Component {
  _interval;

  loop = async () => {
    let jobs = [];

    this.props.viewer.library[0].children.forEach((d) => {
      if (d.networks && d.networks.includes("FILECOIN")) {
        console.log(d);
        jobs.push({
          ipfs: d.ipfs,
          cid: d.ipfs.replace("/ipfs/", ""),
          job: d.job,
          error: d.error,
        });
      }
    });

    console.log({ jobs });
    if (jobs.length) {
      const response = await Actions.checkCIDStatus(jobs);

      console.log(response);

      if (response && response.update) {
        await this.props.onRehydrate();
      }
    }

    if (this._interval) {
      this._interval = window.setTimeout(this.loop, POLLING_INTERVAL);
    }
  };

  componentDidMount() {
    this._interval = this.loop();
  }

  componentWillUnmount() {
    window.clearTimeout(this._interval);
    this._interval = null;
  }

  componentDidUpdate(prevProps) {
    if (!this._interval) {
      console.log("Starting loop again");
      this._interval = this.loop();
    }
  }

  render() {
    let rows = this.props.viewer.library[0].children.map((each) => {
      return {
        ...each,
        button:
          each.networks && each.networks.includes("FILECOIN")
            ? null
            : "Store on Filecoin",
      };
    });

    const data = {
      columns: [
        { key: "name", name: "Data", type: "FILE_LINK", width: "328px" },
        {
          key: "size",
          name: "Size",
          width: "116px",
          type: "FILE_SIZE",
        },
        { key: "type", name: "Type", type: "TEXT_TAG", width: "136px" },
        {
          key: "networks",
          name: "Networks",
          type: "NETWORK_TYPE",
        },
        {
          key: "storage",
          name: "Storage Deal Status",
          width: "148px",
          type: "STORAGE_DEAL_STATUS",
        },
        {
          key: "button",
          hideLabel: true,
          type: "BUTTON",
          action: "SIDEBAR_FILE_STORAGE_DEAL",
          width: "132px",
        },
        {
          key: "error",
          hideLabel: true,
          width: "188px",
        },
      ],
      rows,
    };

    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Are Filecoin deals working?"
          description="At the moment there are some bugs with deals on our Devnet but our team is working through them."
        />

        <DataMeter
          stats={this.props.viewer.stats}
          style={{ margin: "48px 0 24px 0" }}
        />

        <System.H1 style={{ marginTop: 48 }}>
          {this.props.current.name}
        </System.H1>
        <Section
          onAction={this.props.onAction}
          title={`${Strings.bytesToSize(
            this.props.viewer.stats.bytes
          )} uploaded`}
          buttons={[
            {
              name: "Upload data",
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
            },
          ]}
        >
          <System.Table
            key={this.props.current.folderId}
            data={data}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            onChange={this._handleChange}
          />
        </Section>
      </ScenePage>
    );
  }
}
