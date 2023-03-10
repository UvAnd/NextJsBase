// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IArticaleFields {
  /** Title */
  title: string;

  /** slug */
  slug?: string | undefined;

  /** Description */
  description?: string | undefined;

  /** Content */
  content: Document;

  /** Btn text */
  btnText?: string | undefined;
}

export interface IArticale extends Entry<IArticaleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "articale";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IHomeFields {
  /** Title */
  title?: string | undefined;

  /** Description */
  description?: Document | undefined;

  /** Background */
  background?: Asset | undefined;
}

export interface IHome extends Entry<IHomeFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "home";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "articale" | "home";

export type IEntry = IArticale | IHome;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
