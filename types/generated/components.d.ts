import type { Schema, Attribute } from '@strapi/strapi';

export interface EventContact extends Schema.Component {
  collectionName: 'components_event_contacts';
  info: {
    displayName: 'contact';
  };
  attributes: {
    name: Attribute.String;
    organization: Attribute.String;
    zip: Attribute.String;
    location: Attribute.String;
    street: Attribute.String;
    phone: Attribute.String;
    mail: Attribute.Email;
  };
}

export interface EventDetails extends Schema.Component {
  collectionName: 'components_event_details';
  info: {
    displayName: 'details';
    icon: 'bullhorn';
    description: '';
  };
  attributes: {
    start: Attribute.Time & Attribute.DefaultTo<'09:00'>;
    end: Attribute.Time;
    zip: Attribute.String;
    location: Attribute.String;
    street: Attribute.String;
  };
}

export interface EventPricing extends Schema.Component {
  collectionName: 'components_event_pricings';
  info: {
    displayName: 'pricing';
    icon: 'dollar-sign';
    description: '';
  };
  attributes: {
    deadline: Attribute.Date;
    charge: Attribute.String;
  };
}

export interface SeedDetails extends Schema.Component {
  collectionName: 'components_seed_details';
  info: {
    displayName: 'details';
    icon: 'puzzle-piece';
    description: '';
  };
  attributes: {
    family: Attribute.String & Attribute.DefaultTo<'false'>;
    variety: Attribute.String;
    lifecycle: Attribute.String;
    intercropping: Attribute.String;
    breeding: Attribute.String;
    distance: Attribute.String;
    minimum: Attribute.String;
    germinability: Attribute.String;
    pollination: Attribute.String;
    selection: Attribute.String;
    usage: Attribute.Text;
  };
}

export interface SharedDownload extends Schema.Component {
  collectionName: 'components_shared_downloads';
  info: {
    displayName: 'download';
    icon: 'download';
    description: '';
  };
  attributes: {
    link: Attribute.String;
    author: Attribute.String;
    title: Attribute.String;
  };
}

export interface SharedEmail extends Schema.Component {
  collectionName: 'components_shared_emails';
  info: {
    displayName: 'email';
    icon: 'envelope';
  };
  attributes: {
    email: Attribute.Email;
  };
}

export interface SharedPhone extends Schema.Component {
  collectionName: 'components_shared_phones';
  info: {
    displayName: 'phone';
    icon: 'phone-volume';
    description: '';
  };
  attributes: {
    phone: Attribute.String;
    name: Attribute.String;
  };
}

export interface TextContent extends Schema.Component {
  collectionName: 'components_text_contents';
  info: {
    displayName: 'content';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    video: Attribute.Media;
    alt_reg: Attribute.Text &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    reg: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          preset: 'light';
          output: 'HTML';
        }
      > &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    eas: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          preset: 'light';
          output: 'HTML';
        }
      > &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    alt_eas: Attribute.Text &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

export interface TextDescription extends Schema.Component {
  collectionName: 'components_text_descriptions';
  info: {
    displayName: 'description';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    reg: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          preset: 'light';
          output: 'HTML';
        }
      > &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    eas: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          preset: 'light';
          output: 'HTML';
        }
      > &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'event.contact': EventContact;
      'event.details': EventDetails;
      'event.pricing': EventPricing;
      'seed.details': SeedDetails;
      'shared.download': SharedDownload;
      'shared.email': SharedEmail;
      'shared.phone': SharedPhone;
      'text.content': TextContent;
      'text.description': TextDescription;
    }
  }
}
