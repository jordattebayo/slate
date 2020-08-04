import * as React from "react";
import * as System from "~/components/system";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 

import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";
import TextLoop from "react-text-loop";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import {
    LoaderProgress,
  } from "~/components/system/components/Loaders";

const STYLES_ROOT = css`
  width:80%;
  margin-left:auto;
  margin-right:auto;
`;

const STYLES_HERO = css`
  font-family: 'inter-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 56px;
  line-height: 160%;
  }
`;

const STYLES_FEATURES = css`
  margin: 55px 0px;
  h3{
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 160%;
    margin: 15px 0px;
  }
  p{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 160%;
    margin: 15px 0px;
     }
  }
`;

const STYLES_LIST_TYPES = css`
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    text-decoration none;
    margin: 15px 0px;
  }
  }
`;

const STYLES_CARD_GALLERY = css`
  display: flex;
  justify-content: space-between;
  margins: 90px 0px;
  }
`;

const STYLES_CARD = css`
  background: #FFFFFF;
  border: 1.6627px solid #000000;
  box-sizing: border-box;
  width: 350px;
  height: auto;
  img{
    padding: 5px;
    max-width: 100%;
    height: auto;
  }
  p{
    padding: 20px 34px;
    margin: 0px;
  }
  }
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class IndexPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
        <System.SiteNav />

        <section css={STYLES_HERO}>
          <h1>Store your <TextLoop interval={500} children={["files,", "images,", "PDFs,", "friends,"]} />
          <br/>turn them into collections, 
          <br/>and share them with the world — with Slate.</h1>
          <br/>
          
          <System.H1><a>Store files -></a></System.H1>
        </section>

        <section css={STYLES_FEATURES}>
          <h3>Store Files</h3>
          <p>Slate is the first decentralized storage system made for everyone. Use slate to store:</p>
          <Tabs>
            <div css={STYLES_LIST_TYPES}>
              <Tab><p>Images</p></Tab>
              <Tab><p>Video</p></Tab>
              <Tab><p>Books</p></Tab>
          </div>

          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          
        </Tabs>
        </section>

        <section css={STYLES_FEATURES}>
          <h3>Create Slates</h3>
          <p>Organize and store your files into shareable collections. </p>
          
          <Tabs>
            <div css={STYLES_LIST_TYPES}>
              <Tab><p>Images</p></Tab>
              <Tab><p>Video</p></Tab>
              <Tab><p>Books</p></Tab>
          </div>

          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          
        </Tabs>
        </section>

        <section css={STYLES_FEATURES}>
          <h3>Share Them</h3>
          <p>Organize and store your files into shareable collections</p> 
          <Tabs>
            <div css={STYLES_LIST_TYPES}>
              <Tab><p>Images</p></Tab>
              <Tab><p>Video</p></Tab>
              <Tab><p>Books</p></Tab>
          </div>

          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x200"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          <Panel>
            <div css={STYLES_CARD_GALLERY}>
            <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
              <article css={STYLES_CARD}>
              <img src="https://source.unsplash.com/collection/190727/350x250"></img>
                <p>Sample.png</p>
              </article>
            </div>
          </Panel>
          
        </Tabs>
        </section>
     
        <System.SiteFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
