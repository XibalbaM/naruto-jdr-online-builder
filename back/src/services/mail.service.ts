import nodemailer from "nodemailer";

import config from "../config/config.js";
import {getUserNameFromEmail} from "./account.service.js";

/**
 * The transporter used to send emails
 */
const transporter = nodemailer.createTransport(config.loginEmail.transport);

/**
 * The template for the email sent to the user to confirm his account
 * @param connectionToken The token to connect the user to his account
 */
const accountCreationTemplate = (connectionToken: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Stripo TEST: &quot;New message&quot;</title><!--[if (mso 16)]>
    <style type="text/css">
      a {
        text-decoration: none;
      }
    </style><![endif]--><!--[if gte mso 9]>
    <style>sup {
      font-size: 100% !important;
    }</style><![endif]--><!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
        background: #56d66b !important;
      }

      .es-button-border:hover {
        border-color: #42d159 #42d159 #42d159 #42d159 !important;
        background: #56d66b !important;
      }

      @media only screen and (max-width: 600px) {
        p, ul li, ol li, a {
          line-height: 150% !important
        }

        h1, h2, h3, h1 a, h2 a, h3 a {
          line-height: 120%
        }

        h1 {
          font-size: 30px !important;
          text-align: left
        }

        h2 {
          font-size: 24px !important;
          text-align: left
        }

        h3 {
          font-size: 20px !important;
          text-align: left
        }

        .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left
        }

        .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left
        }

        .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left
        }

        .es-menu td a {
          font-size: 14px !important
        }

        .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {
          font-size: 14px !important
        }

        .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {
          font-size: 14px !important
        }

        .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
          font-size: 14px !important
        }

        .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: inline-block !important
        }

        a.es-button, button.es-button {
          font-size: 18px !important;
          display: inline-block !important
        }

        .es-adaptive table, .es-left, .es-right {
          width: 100% !important
        }

        .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 100% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden, .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt, .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important
        }
      }
    </style>
    <style> #mshidden {
      mso-hide: all;
      display: none;
      width: 0px;
      height: 0px;
      float: none;
      opacity: 0.0;
      border: 0px solid;
      margin: 0px;
    } </style>
  </head>
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0; color: #424242">
    <img id="mshidden"
         src="https://esputnik.com/repository/applications/commons/hidden.png?iid=2fdcbd70-d975-11ed-95db-9d39fb5e73cf"
         alt=""
         style="display: block; width: 0px; height: 0px; visibility:hidden; float: none; opacity:0.0; filter:alpha(opacity=0);border: 0px solid; margin: 0px">
    <div style="background-color:#F5F5F5"><!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#F5F5F5"></v:fill>
      </v:background><![endif]-->
      <table width="100%"
             cellspacing="0"
             cellpadding="0"
             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F5F5F5">
        <tbody>
          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px;border-radius:26px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#FFFFFF"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:26px">
                                        <tbody>
                                          <tr>
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4238 8.001C26.4276 5.99966 23.5724 5.99966 22.5762 8.001L18.1368 16.9195C17.8743 17.4469 17.4469 17.8743 16.9195 18.1368L8.001 22.5762C5.99966 23.5724 5.99967 26.4276 8.00101 27.4238L16.9195 31.8632C17.4469 32.1257 17.8743 32.5531 18.1368 33.0805L22.5762 41.999C23.5724 44.0003 26.4276 44.0003 27.4238 41.999L31.8632 33.0805C32.1257 32.5531 32.5531 32.1257 33.0805 31.8632L41.999 27.4238C44.0003 26.4276 44.0003 23.5724 41.999 22.5762L33.0805 18.1368C32.5531 17.8743 32.1257 17.4469 31.8632 16.9195L27.4238 8.001ZM25 29.5819C27.5305 29.5819 29.5819 27.5305 29.5819 25C29.5819 22.4695 27.5305 20.418 25 20.418C22.4695 20.418 20.418 22.4695 20.418 25C20.418 27.5305 22.4695 29.5819 25 29.5819Z" fill="url(#paint0_linear_850_1711)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25 48.5417C30.1661 48.5417 34.9436 46.8776 38.8256 44.0563C38.2568 43.3439 37.9167 42.4408 37.9167 41.4583C37.9167 39.1571 39.7822 37.2917 42.0834 37.2917C42.1322 37.2947 42.1957 37.2959 42.2726 37.2974C42.7336 37.3063 43.6729 37.3244 44.7652 37.7937C47.1542 34.1104 48.5417 29.7172 48.5417 25C48.5417 19.8363 46.8792 15.0609 44.0602 11.1798C43.3472 11.7506 42.4426 12.0919 41.4583 12.0919C39.1571 12.0919 37.2917 10.2264 37.2917 7.92522C37.2947 7.87646 37.2959 7.81288 37.2974 7.736C37.3063 7.27404 37.3245 6.33184 37.7966 5.23668C34.1127 2.84649 29.7184 1.45833 25 1.45833C19.8339 1.45833 15.0564 3.12239 11.1744 5.94374C11.7432 6.65611 12.0833 7.55918 12.0833 8.54167C12.0833 10.8429 10.2178 12.7083 7.9166 12.7083C7.86784 12.7053 7.80428 12.7041 7.72743 12.7026H7.72741H7.72739H7.72737C7.26636 12.6937 6.32708 12.6756 5.2348 12.2063C2.84576 15.8896 1.45833 20.2828 1.45833 25C1.45833 30.143 3.10755 34.9009 5.90598 38.7735C6.60767 38.236 7.48525 37.9166 8.43742 37.9166C10.7386 37.9166 12.6041 39.7821 12.6041 42.0833C12.6011 42.1321 12.5998 42.1957 12.5984 42.2725C12.5896 42.7261 12.572 43.6424 12.1246 44.712C15.8246 47.1336 20.2479 48.5417 25 48.5417ZM38.5301 3.97413C34.6302 1.45933 29.9855 0 25 0C19.394 0 14.219 1.84518 10.0491 4.96135C9.42529 4.58896 8.69593 4.375 7.9166 4.375C6.55361 4.375 5.34347 5.02944 4.58328 6.04124C3.16661 4.62423 3.993 2.04833 4.58328 0.9375C0.38944 4.29257 0.93974 8.48262 3.12494 10.7292C3.40587 11.018 3.68954 11.2642 3.97132 11.4742C1.45825 15.3733 0 20.0163 0 25C0 30.5716 1.8226 35.7174 4.9041 39.8739C4.50277 40.5144 4.27075 41.2718 4.27075 42.0833C4.27075 43.4463 4.9252 44.6564 5.93699 45.4166C4.51999 46.8333 1.94408 46.0069 0.833252 45.4166C4.18832 49.6105 8.37838 49.0602 10.6249 46.875C10.9293 46.5789 11.1864 46.2798 11.4037 45.983C15.3172 48.5241 19.9862 50 25 50C30.606 50 35.781 48.1548 39.9509 45.0387C40.5747 45.411 41.3041 45.625 42.0834 45.625C43.4464 45.625 44.6565 44.9706 45.4167 43.9588C46.8334 45.3758 46.007 47.9517 45.4167 49.0625C49.6106 45.7074 49.0603 41.5174 46.8751 39.2708C46.5941 38.982 46.3105 38.7358 46.0287 38.5258C48.5418 34.6267 50 29.9837 50 25C50 19.3957 48.1559 14.2222 45.0415 10.053C45.4121 9.43018 45.625 8.70256 45.625 7.92522C45.625 6.56223 44.9706 5.3521 43.9588 4.59191C45.3758 3.17524 47.9517 4.00163 49.0625 4.59191C45.7074 0.398068 41.5174 0.948368 39.2708 3.13357C38.984 3.41256 38.7392 3.69426 38.5301 3.97413Z" fill="url(#paint1_linear_850_1711)"/>
  <defs>
    <linearGradient id="paint0_linear_850_1711" x1="43.5" y1="6.49997" x2="5.08147" y2="8.03671" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FCA3A7"/>
      <stop offset="1" stop-color="#7C00FF"/>
    </linearGradient>
    <linearGradient id="paint1_linear_850_1711" x1="50" y1="-2.79397e-05" x2="-1.91694" y2="2.07665" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FCA3A7"/>
      <stop offset="1" stop-color="#7C00FF"/>
    </linearGradient>
  </defs>
</svg>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-bottom:30px;padding-top:40px">
                                              <h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#030505">
                                                <strong style="color: #030505">Votre compte n’attend plus qu’une validation</strong></h1></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#424242;font-size:20px">
                                                Afin de vérifier votre email et terminer la création de votre compte sur Ninja Builder, merci de cliquer sur le lien d’activation
                                                suivant, qui restera valable pendant les cinq prochaines minutes.</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Votre lien de validation<br><span style="color:#800080"><a target="_blank"
                                                                                                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#b72ebc;font-size:14px"
                                                                                                                                          href="${config.loginUrl + connectionToken}">builder.naruto-jdr.com/validation</a></span></strong>
                                              </p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Si vous n’êtes pas à l’origine de ce compte</strong></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Si vous n’êtes pas à l’origine de la création de ce compte, ne faites rien. Tant que la validation n’est pas finalisée, le compte ne
                                                sera pas créé. Si vous recevez cet email de façon très répété, <a target="_blank"
                                                                                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:20px"
                                                                                                                   href="mailto:pierre@naruto-jdr.com">contactez nous ici</a>.</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-bottom: 100px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Ninja Builder</strong></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Ninja Builder est une application gratuite de création de personnage proposée par la communauté du jeu de rôle Naruto. Aucune donnée
                                                n’est utilisée à des fins commerciales directes, indirectes ou vendues à des entreprises tierces.<br><br></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Vous pouvez contacter l’équipe de création directement sur Discord, canal “Outils-numériques”</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#f5f5f5"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f5f5f5">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:40px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px;text-align: center">
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://discord.gg/C6TVG4q">Discord</a>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://naruto-jdr.com">naruto-jdr.com</a>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://www.dropbox.com/sh/ninpayam53pewzu/AACvLDrEC9Ub9pS1Co55CyOOa?dl=0">Ressources</a>
                                                <br/>
                                                <span style="color: #A3A5A2; font-size: 13px">Ninja Builder v3.0.0</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#f5f5f5"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f5f5f5">
                                        <tbody>
                                          <tr>
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4542 4.80063C15.8565 3.59982 14.1433 3.59982 13.5456 4.80063L10.882 10.1517C10.7245 10.4682 10.468 10.7246 10.1516 10.8821L4.8005 13.5457C3.5997 14.1434 3.5997 15.8566 4.80051 16.4543L10.1516 19.1179C10.468 19.2754 10.7245 19.5319 10.882 19.8483L13.5456 25.1994C14.1433 26.4002 15.8565 26.4002 16.4542 25.1994L19.1178 19.8483C19.2753 19.5319 19.5318 19.2754 19.8482 19.1179L25.1993 16.4543C26.4001 15.8566 26.4001 14.1434 25.1993 13.5457L19.8482 10.8821C19.5318 10.7246 19.2753 10.4682 19.1178 10.1517L16.4542 4.80063ZM14.9999 17.7492C16.5182 17.7492 17.7491 16.5183 17.7491 15C17.7491 13.4817 16.5182 12.2509 14.9999 12.2509C13.4816 12.2509 12.2507 13.4817 12.2507 15C12.2507 16.5183 13.4816 17.7492 14.9999 17.7492Z" fill="#A3A5A2"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 29.125C18.0997 29.125 20.9662 28.1266 23.2954 26.4338C22.9541 26.0063 22.75 25.4645 22.75 24.875C22.75 23.4943 23.8693 22.375 25.25 22.375C25.2793 22.3768 25.3175 22.3775 25.3636 22.3784C25.6402 22.3838 26.2038 22.3946 26.8591 22.6762C28.2925 20.4662 29.125 17.8303 29.125 15C29.125 11.9018 28.1275 9.03655 26.4361 6.70792C26.0084 7.05036 25.4656 7.25516 24.875 7.25516C23.4943 7.25516 22.375 6.13587 22.375 4.75516C22.3768 4.7259 22.3775 4.68775 22.3784 4.64162C22.3838 4.36444 22.3947 3.79911 22.678 3.14201C20.4676 1.70789 17.8311 0.875 15 0.875C11.9003 0.875 9.03385 1.87343 6.70463 3.56624C7.04592 3.99366 7.24996 4.53551 7.24996 5.125C7.24996 6.50571 6.13067 7.625 4.74996 7.625C4.7207 7.62319 4.68255 7.62245 4.63642 7.62157C4.35982 7.61623 3.79625 7.60537 3.14088 7.3238C1.70745 9.53378 0.875 12.1697 0.875 15C0.875 18.0858 1.86451 20.9405 3.54353 23.264C3.96453 22.9416 4.49104 22.75 5.0623 22.75C6.44302 22.75 7.56231 23.8693 7.56231 25.25C7.56049 25.2792 7.55976 25.3174 7.55887 25.3635C7.55363 25.6356 7.54303 26.1854 7.27465 26.8271C9.49465 28.2801 12.1487 29.125 15 29.125ZM23.1181 2.38448C20.7781 0.875601 17.9913 0 15 0C11.6364 0 8.5314 1.10711 6.02949 2.97681C5.65517 2.75338 5.21756 2.625 4.74996 2.625C3.93216 2.625 3.20608 3.01767 2.74997 3.62474C1.89997 2.77454 2.3958 1.229 2.74997 0.5625C0.233664 2.57554 0.563844 5.08957 1.87496 6.4375C2.04352 6.61079 2.21373 6.75854 2.38279 6.88454C0.874948 9.22398 0 12.0098 0 15C0 18.3429 1.09352 21.4304 2.94237 23.9242C2.70154 24.3085 2.5623 24.763 2.5623 25.25C2.5623 26.0678 2.95497 26.7938 3.56205 27.25C2.71184 28.1 1.1663 27.6041 0.499805 27.25C2.51285 29.7663 5.02688 29.4361 6.3748 28.125C6.55746 27.9473 6.71173 27.7678 6.84208 27.5897C9.19023 29.1144 11.9917 30 15 30C18.3636 30 21.4686 28.8929 23.9705 27.0232C24.3448 27.2466 24.7824 27.375 25.25 27.375C26.0678 27.375 26.7939 26.9823 27.25 26.3753C28.1 27.2255 27.6042 28.771 27.25 29.4375C29.7663 27.4245 29.4362 24.9104 28.125 23.5625C27.9565 23.3892 27.7863 23.2415 27.6172 23.1155C29.1251 20.776 30 17.9902 30 15C30 11.6374 28.8936 8.53331 27.0249 6.03179C27.2473 5.65812 27.375 5.22156 27.375 4.75516C27.375 3.93736 26.9823 3.21128 26.3753 2.75517C27.2255 1.90517 28.771 2.401 29.4375 2.75517C27.4245 0.238864 24.9104 0.569044 23.5625 1.88016C23.3904 2.04755 23.2435 2.21657 23.1181 2.38448Z" fill="#A3A5A2"/>
</svg>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
}

/**
 * Template for the connection email
 * @param connectionToken The token to connect the user to his account
 * @param username The name of the user
 */
const connectionTemplate = (connectionToken: string, username: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Stripo TEST: &quot;New message&quot;</title><!--[if (mso 16)]>
    <style type="text/css">
      a {
        text-decoration: none;
      }
    </style><![endif]--><!--[if gte mso 9]>
    <style>sup {
      font-size: 100% !important;
    }</style><![endif]--><!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
        background: #56d66b !important;
      }

      .es-button-border:hover {
        border-color: #42d159 #42d159 #42d159 #42d159 !important;
        background: #56d66b !important;
      }

      @media only screen and (max-width: 600px) {
        p, ul li, ol li, a {
          line-height: 150% !important
        }

        h1, h2, h3, h1 a, h2 a, h3 a {
          line-height: 120%
        }

        h1 {
          font-size: 30px !important;
          text-align: left
        }

        h2 {
          font-size: 24px !important;
          text-align: left
        }

        h3 {
          font-size: 20px !important;
          text-align: left
        }

        .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left
        }

        .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left
        }

        .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left
        }

        .es-menu td a {
          font-size: 14px !important
        }

        .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {
          font-size: 14px !important
        }

        .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {
          font-size: 14px !important
        }

        .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {
          font-size: 14px !important
        }

        .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: inline-block !important
        }

        a.es-button, button.es-button {
          font-size: 18px !important;
          display: inline-block !important
        }

        .es-adaptive table, .es-left, .es-right {
          width: 100% !important
        }

        .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 100% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden, .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt, .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important
        }
      }
    </style>
    <style> #mshidden {
      mso-hide: all;
      display: none;
      width: 0px;
      height: 0px;
      float: none;
      opacity: 0.0;
      border: 0px solid;
      margin: 0px;
    } </style>
  </head>
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0; color: #424242">
    <img id="mshidden"
         src="https://esputnik.com/repository/applications/commons/hidden.png?iid=2fdcbd70-d975-11ed-95db-9d39fb5e73cf"
         alt=""
         style="display: block; width: 0px; height: 0px; visibility:hidden; float: none; opacity:0.0; filter:alpha(opacity=0);border: 0px solid; margin: 0px">
    <div style="background-color:#F5F5F5"><!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#F5F5F5"></v:fill>
      </v:background><![endif]-->
      <table width="100%"
             cellspacing="0"
             cellpadding="0"
             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F5F5F5">
        <tbody>
          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px;border-radius:26px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#FFFFFF"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:26px">
                                        <tbody>
                                          <tr>
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4238 8.001C26.4276 5.99966 23.5724 5.99967 22.5762 8.00101L18.1368 16.9195C17.8743 17.4469 17.4469 17.8743 16.9195 18.1368L8.001 22.5762C5.99966 23.5724 5.99967 26.4276 8.00101 27.4238L16.9195 31.8632C17.4469 32.1257 17.8743 32.5531 18.1368 33.0805L22.5762 41.999C23.5724 44.0003 26.4276 44.0003 27.4238 41.999L31.8632 33.0805C32.1257 32.5531 32.5531 32.1257 33.0805 31.8632L41.999 27.4238C44.0003 26.4276 44.0003 23.5724 41.999 22.5762L33.0805 18.1368C32.5531 17.8743 32.1257 17.4469 31.8632 16.9195L27.4238 8.001ZM25 29.5819C27.5305 29.5819 29.5819 27.5305 29.5819 25C29.5819 22.4695 27.5305 20.4181 25 20.4181C22.4695 20.4181 20.418 22.4695 20.418 25C20.418 27.5305 22.4695 29.5819 25 29.5819Z" fill="url(#paint0_linear_850_1776)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25 48.5417C30.1661 48.5417 34.9436 46.8776 38.8256 44.0563C38.2568 43.3439 37.9167 42.4408 37.9167 41.4583C37.9167 39.1571 39.7822 37.2917 42.0834 37.2917C42.1322 37.2947 42.1957 37.2959 42.2726 37.2974C42.7336 37.3063 43.6729 37.3244 44.7652 37.7937C47.1542 34.1104 48.5417 29.7172 48.5417 25C48.5417 19.8363 46.8792 15.0609 44.0602 11.1798C43.3472 11.7506 42.4426 12.0919 41.4583 12.0919C39.1571 12.0919 37.2917 10.2264 37.2917 7.92522C37.2947 7.87646 37.2959 7.81288 37.2974 7.736C37.3063 7.27404 37.3245 6.33184 37.7966 5.23668C34.1127 2.84649 29.7184 1.45833 25 1.45833C19.8339 1.45833 15.0564 3.12239 11.1744 5.94374C11.7432 6.65611 12.0833 7.55918 12.0833 8.54167C12.0833 10.8429 10.2178 12.7083 7.9166 12.7083C7.86784 12.7053 7.80428 12.7041 7.72743 12.7026H7.72741H7.72739H7.72737C7.26636 12.6937 6.32708 12.6756 5.2348 12.2063C2.84576 15.8896 1.45833 20.2828 1.45833 25C1.45833 30.143 3.10755 34.9009 5.90598 38.7735C6.60767 38.236 7.48525 37.9166 8.43742 37.9166C10.7386 37.9166 12.6041 39.7821 12.6041 42.0833C12.6011 42.1321 12.5998 42.1957 12.5984 42.2725C12.5896 42.7261 12.572 43.6424 12.1246 44.712C15.8246 47.1336 20.2479 48.5417 25 48.5417ZM38.5301 3.97413C34.6302 1.45933 29.9855 0 25 0C19.394 0 14.219 1.84518 10.0491 4.96135C9.42529 4.58896 8.69593 4.375 7.9166 4.375C6.55361 4.375 5.34347 5.02944 4.58328 6.04124C3.16661 4.62423 3.993 2.04833 4.58328 0.9375C0.38944 4.29257 0.93974 8.48262 3.12494 10.7292C3.40587 11.018 3.68954 11.2642 3.97132 11.4742C1.45825 15.3733 0 20.0163 0 25C0 30.5716 1.8226 35.7174 4.9041 39.8739C4.50277 40.5144 4.27075 41.2718 4.27075 42.0833C4.27075 43.4463 4.9252 44.6564 5.93699 45.4166C4.51999 46.8333 1.94408 46.0069 0.833252 45.4166C4.18832 49.6105 8.37838 49.0602 10.6249 46.875C10.9293 46.5789 11.1864 46.2798 11.4037 45.983C15.3172 48.5241 19.9862 50 25 50C30.606 50 35.781 48.1548 39.9509 45.0387C40.5747 45.411 41.3041 45.625 42.0834 45.625C43.4464 45.625 44.6565 44.9706 45.4167 43.9588C46.8334 45.3758 46.007 47.9517 45.4167 49.0625C49.6106 45.7074 49.0603 41.5174 46.8751 39.2708C46.5941 38.982 46.3105 38.7358 46.0287 38.5258C48.5418 34.6267 50 29.9837 50 25C50 19.3957 48.1559 14.2222 45.0415 10.053C45.4121 9.43018 45.625 8.70256 45.625 7.92522C45.625 6.56223 44.9706 5.3521 43.9588 4.59191C45.3758 3.17524 47.9517 4.00163 49.0625 4.59191C45.7074 0.398068 41.5174 0.948368 39.2708 3.13357C38.984 3.41256 38.7392 3.69426 38.5301 3.97413Z" fill="url(#paint1_linear_850_1776)"/>
  <defs>
    <linearGradient id="paint0_linear_850_1776" x1="43.5" y1="6.49998" x2="5.08147" y2="8.03672" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FCA3A7"/>
      <stop offset="1" stop-color="#7C00FF"/>
    </linearGradient>
    <linearGradient id="paint1_linear_850_1776" x1="50" y1="-2.79397e-05" x2="-1.91694" y2="2.07665" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FCA3A7"/>
      <stop offset="1" stop-color="#7C00FF"/>
    </linearGradient>
  </defs>
</svg>
</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-bottom:30px;padding-top:40px">
                                              <h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#030505">
                                                <strong style="color: #030505">Hello ${username} ! Ravi de te revoir parmi nous.</strong></h1></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#424242;font-size:20px">
                                                Afin de vérifier votre email et terminer la tentative de connexion sur Ninja Builder, merci de cliquer sur ce lien d’activation, valable pendant les cinq prochaines minutes.
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Votre lien de validation<br><span style="color:#800080"><a target="_blank"
                                                                                                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#b72ebc;font-size:14px"
                                                                                                                                          href="${config.loginUrl + connectionToken}">builder.naruto-jdr.com/validation</a></span></strong>
                                              </p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Si vous n’êtes pas à l’origine de cette tentative de connexion</strong></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Si vous n’êtes pas à l’origine de cette tentative de connexion, ne faites rien. Il faut avoir accès à ce lien pour que votre compte soit accessible. Si vous recevez cet email de façon très répété, <a target="_blank"
                                                                                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:20px"
                                                                                                                   href="mailto:pierre@naruto-jdr.com">contactez nous ici</a>.</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:520px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-bottom: 100px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:33px;color:#333333;font-size:22px">
                                                <strong style="color: #030505">Ninja Builder</strong></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Ninja Builder est une application gratuite de création de personnage proposée par la communauté du jeu de rôle Naruto. Aucune donnée
                                                n’est utilisée à des fins commerciales directes, indirectes ou vendues à des entreprises tierces.<br><br></p>
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#333333;font-size:20px">
                                                Vous pouvez contacter l’équipe de création directement sur Discord, canal “Outils-numériques”</p></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#f5f5f5"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f5f5f5">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="padding:0;Margin:0;padding-top:40px">
                                              <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px;text-align: center">
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://discord.gg/C6TVG4q">Discord</a>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://naruto-jdr.com">naruto-jdr.com</a>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <a target="_blank"
                                                   style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#605A5A;font-size:13px"
                                                   href="https://www.dropbox.com/sh/ninpayam53pewzu/AACvLDrEC9Ub9pS1Co55CyOOa?dl=0">Ressources</a>
                                                <br/>
                                                <span style="color: #A3A5A2; font-size: 13px">Ninja Builder v3.0.0</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0"
                     cellspacing="0"
                     class="es-content"
                     align="center"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>
                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table bgcolor="#ffffff"
                             class="es-content-body"
                             align="center"
                             cellpadding="0"
                             cellspacing="0"
                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:0;Margin:0">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                                      <table cellpadding="0"
                                             cellspacing="0"
                                             width="100%"
                                             bgcolor="#f5f5f5"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f5f5f5">
                                        <tbody>
                                          <tr>
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4542 4.80051C15.8565 3.5997 14.1433 3.5997 13.5456 4.80051L10.882 10.1516C10.7245 10.468 10.468 10.7245 10.1516 10.882L4.8005 13.5456C3.5997 14.1433 3.5997 15.8565 4.80051 16.4542L10.1516 19.1178C10.468 19.2753 10.7245 19.5318 10.882 19.8482L13.5456 25.1993C14.1433 26.4001 15.8565 26.4001 16.4542 25.1993L19.1178 19.8482C19.2753 19.5318 19.5318 19.2753 19.8482 19.1178L25.1993 16.4542C26.4001 15.8565 26.4001 14.1433 25.1993 13.5456L19.8482 10.882C19.5318 10.7245 19.2753 10.468 19.1178 10.1516L16.4542 4.80051ZM14.9999 17.7491C16.5182 17.7491 17.7491 16.5182 17.7491 14.9999C17.7491 13.4816 16.5182 12.2507 14.9999 12.2507C13.4816 12.2507 12.2507 13.4816 12.2507 14.9999C12.2507 16.5182 13.4816 17.7491 14.9999 17.7491Z" fill="#A3A5A2"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 29.125C18.0997 29.125 20.9662 28.1266 23.2954 26.4338C22.9541 26.0063 22.75 25.4645 22.75 24.875C22.75 23.4943 23.8693 22.375 25.25 22.375C25.2793 22.3768 25.3175 22.3775 25.3636 22.3784C25.6402 22.3838 26.2038 22.3946 26.8591 22.6762C28.2925 20.4662 29.125 17.8303 29.125 15C29.125 11.9018 28.1275 9.03655 26.4361 6.70792C26.0084 7.05036 25.4656 7.25516 24.875 7.25516C23.4943 7.25516 22.375 6.13587 22.375 4.75516C22.3768 4.7259 22.3775 4.68775 22.3784 4.64162C22.3838 4.36444 22.3947 3.79911 22.678 3.14201C20.4676 1.70789 17.8311 0.875 15 0.875C11.9003 0.875 9.03385 1.87343 6.70463 3.56624C7.04592 3.99366 7.24996 4.53551 7.24996 5.125C7.24996 6.50571 6.13067 7.625 4.74996 7.625C4.7207 7.62319 4.68255 7.62245 4.63642 7.62157C4.35982 7.61623 3.79625 7.60537 3.14088 7.3238C1.70745 9.53378 0.875 12.1697 0.875 15C0.875 18.0858 1.86451 20.9405 3.54353 23.264C3.96453 22.9416 4.49104 22.75 5.0623 22.75C6.44302 22.75 7.56231 23.8693 7.56231 25.25C7.56049 25.2792 7.55976 25.3174 7.55887 25.3635C7.55363 25.6356 7.54303 26.1854 7.27465 26.8271C9.49465 28.2801 12.1487 29.125 15 29.125ZM23.1181 2.38448C20.7781 0.875601 17.9913 0 15 0C11.6364 0 8.5314 1.10711 6.02949 2.97681C5.65517 2.75338 5.21756 2.625 4.74996 2.625C3.93216 2.625 3.20608 3.01767 2.74997 3.62474C1.89997 2.77454 2.3958 1.229 2.74997 0.5625C0.233664 2.57554 0.563844 5.08957 1.87496 6.4375C2.04352 6.61079 2.21373 6.75854 2.38279 6.88454C0.874948 9.22398 0 12.0098 0 15C0 18.3429 1.09352 21.4304 2.94237 23.9242C2.70154 24.3085 2.5623 24.763 2.5623 25.25C2.5623 26.0678 2.95497 26.7938 3.56205 27.25C2.71184 28.1 1.1663 27.6041 0.499805 27.25C2.51285 29.7663 5.02688 29.4361 6.3748 28.125C6.55746 27.9473 6.71173 27.7678 6.84208 27.5897C9.19023 29.1144 11.9917 30 15 30C18.3636 30 21.4686 28.8929 23.9705 27.0232C24.3448 27.2466 24.7824 27.375 25.25 27.375C26.0678 27.375 26.7939 26.9823 27.25 26.3753C28.1 27.2255 27.6042 28.771 27.25 29.4375C29.7663 27.4245 29.4362 24.9104 28.125 23.5625C27.9565 23.3892 27.7863 23.2415 27.6172 23.1155C29.1251 20.776 30 17.9902 30 15C30 11.6374 28.8936 8.53331 27.0249 6.03179C27.2473 5.65812 27.375 5.22156 27.375 4.75516C27.375 3.93736 26.9823 3.21128 26.3753 2.75517C27.2255 1.90517 28.771 2.401 29.4375 2.75517C27.4245 0.238864 24.9104 0.569044 23.5625 1.88016C23.3904 2.04755 23.2435 2.21657 23.1181 2.38448Z" fill="#A3A5A2"/>
</svg>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
}

/**
 * Send an email to the user to confirm his connection or registration
 * @param to The email of the user
 * @param connectionToken The token to use to connect
 * @param isRegistration Whether the email is for a registration or a connection
 */
export async function sendConnectionEmail(to: string, connectionToken: string, isRegistration: boolean) {

    const username = isRegistration ? undefined : await getUserNameFromEmail(to);

    await transporter.sendMail({
        from: config.loginEmail.username,
        to: to,
        subject: isRegistration ? "Inscription" : "Connexion",
        html: isRegistration ? accountCreationTemplate(connectionToken) : connectionTemplate(connectionToken, username)
    });
}