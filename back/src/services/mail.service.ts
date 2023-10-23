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
                                                <img src="data:image/png;base64,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">
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
                                                                                                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#b72ebc;font-size:20px"
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
                                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAABelBMVEUAAAD///+AgIC/v7+ZmZmqqqqZmZmioqKqqqqdnZ2kpKSqqqqfn5+lpaWqqpyhoaGmpqaeqp6jo6Onp56ioqKlpaWfp5+ioqKlpaWkpKSgpqCioqKkpKShp6Gjo6Oip6KkpKSlpaGhpqGjp6OipqKhpaGjpqOkpKGipaKjp6OkpKGipqKkpKGipaKjpqOkpKGipaKjpqOkpKGipaKjpqOkpKKjpaOkpqGipaKkpKGjpqOkpKGjpqOkpqGjpaOkpKKipaKjpqGkpKKjpqGjpaOkpqKipaKjpaGkpqKjpaOjpaGjpaGkpqKjpKOjpaGipqKjpaOjpaKjpaKjpqOjpaKkpaKjpKOkpaKjpaOjpKKjpaOipaKjpqKjpaKjpaOjpqKjpaKjpaOjpKKkpaKjpKKipaKjpaKjpaKjpaOjpaKjpaKjpqKjpaKjpaGjpaKjpaKjpaKjpaKkpaKjpaKjpqKjpaGjpaKjpaKipaKjpaKjpaKjpaKjpaKjpaLtvhhtAAAAfXRSTlMAAQIEBQYKCwwNDg8QERITFBUZHR4fICElKissLTEyNDU2OTo8REhJSktMTVFSU1RVVldYWVpbXF1fYWJkbW9wcXJzdXp7fH1+f4CIiYqLjI2OmaChoqOttre5vr/AwcLDxMXGyMnKy8zNztDZ2tvc3d7f4OTl6ezt7u/9/jlnDhMAAAABYktHRAH/Ai3eAAAB6ElEQVQoz3WT61cSURTFfzODKRBaOmjvwh4IamWBlZVZ4iMzK9Sy1BDKtKKhmaCU3P97H2YGtbU4X+49Z6+z177n7AvEAaAjs1R2Pc+tvM5YAIkeAC4/AIjP15bHbYC+Oyu1ha7kmvT5ErA9mhi+OvqjkKAV0VmnLpXGJuL0qNSQGrYPRCz/nJJUjwPdB5J0MABAqtlMAVCUpGGA95KkcwB8kb4aANOSNAiQrEvaMgGGJSkL0FnWQWMEIOpMFZ+dCJvDdvPCgF2NAQuzoeCsJEmZMJ+ZAasWDdNtH941grzbiZBZCdEnCmIyrCyneTPmX69vqxXfb/sE4y+o2ICR3ZEkredyG5KknawB2GU8ILXrd62bYG4EClJg1nAh0gxIcwD5INm34BdeO3jPAo+f5iH5hgnmZkB+BQyXSt8RaZv5/Mcj0vq3eJlv/7DcEunlcAiTIfo4rLwdIuIk2g01XrNgrtBuJfPzQKxqnzlr/L/QzuniU6cL4NZv6UPHcTuYFUn1JEBakh4dN9N5SdIawH1JWvStuL/nW3HAN2gC6P3T6sYKjJxsSI0tJTj18O6u5DpzscNv0DNXHRnMnrz5Cbj2TX/f9XY9r63mbMDov7fqFGIAExcBOB0FsIZelV3Pc0uLNyLBWOAf69C2L7O1LjgAAAAASUVORK5CYII=">
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
                                            <img src="data:image/png;base64,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">
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
                                                                                                                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#b72ebc;font-size:20px"
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
                                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAABelBMVEUAAAD///+AgIC/v7+ZmZmqqqqZmZmioqKqqqqdnZ2kpKSqqqqfn5+lpaWqqpyhoaGmpqaeqp6jo6Onp56ioqKlpaWfp5+ioqKlpaWkpKSgpqCioqKkpKShp6Gjo6Oip6KkpKSlpaGhpqGjp6OipqKhpaGjpqOkpKGipaKjp6OkpKGipqKkpKGipaKjpqOkpKGipaKjpqOkpKGipaKjpqOkpKKjpaOkpqGipaKkpKGjpqOkpKGjpqOkpqGjpaOkpKKipaKjpqGkpKKjpqGjpaOkpqKipaKjpaGkpqKjpaOjpaGjpaGkpqKjpKOjpaGipqKjpaOjpaKjpaKjpqOjpaKkpaKjpKOkpaKjpaOjpKKjpaOipaKjpqKjpaKjpaOjpqKjpaKjpaOjpKKkpaKjpKKipaKjpaKjpaKjpaOjpaKjpaKjpqKjpaKjpaGjpaKjpaKjpaKjpaKkpaKjpaKjpqKjpaGjpaKjpaKipaKjpaKjpaKjpaKjpaKjpaLtvhhtAAAAfXRSTlMAAQIEBQYKCwwNDg8QERITFBUZHR4fICElKissLTEyNDU2OTo8REhJSktMTVFSU1RVVldYWVpbXF1fYWJkbW9wcXJzdXp7fH1+f4CIiYqLjI2OmaChoqOttre5vr/AwcLDxMXGyMnKy8zNztDZ2tvc3d7f4OTl6ezt7u/9/jlnDhMAAAABYktHRAH/Ai3eAAAB6ElEQVQoz3WT61cSURTFfzODKRBaOmjvwh4IamWBlZVZ4iMzK9Sy1BDKtKKhmaCU3P97H2YGtbU4X+49Z6+z177n7AvEAaAjs1R2Pc+tvM5YAIkeAC4/AIjP15bHbYC+Oyu1ha7kmvT5ErA9mhi+OvqjkKAV0VmnLpXGJuL0qNSQGrYPRCz/nJJUjwPdB5J0MABAqtlMAVCUpGGA95KkcwB8kb4aANOSNAiQrEvaMgGGJSkL0FnWQWMEIOpMFZ+dCJvDdvPCgF2NAQuzoeCsJEmZMJ+ZAasWDdNtH941grzbiZBZCdEnCmIyrCyneTPmX69vqxXfb/sE4y+o2ICR3ZEkredyG5KknawB2GU8ILXrd62bYG4EClJg1nAh0gxIcwD5INm34BdeO3jPAo+f5iH5hgnmZkB+BQyXSt8RaZv5/Mcj0vq3eJlv/7DcEunlcAiTIfo4rLwdIuIk2g01XrNgrtBuJfPzQKxqnzlr/L/QzuniU6cL4NZv6UPHcTuYFUn1JEBakh4dN9N5SdIawH1JWvStuL/nW3HAN2gC6P3T6sYKjJxsSI0tJTj18O6u5DpzscNv0DNXHRnMnrz5Cbj2TX/f9XY9r63mbMDov7fqFGIAExcBOB0FsIZelV3Pc0uLNyLBWOAf69C2L7O1LjgAAAAASUVORK5CYII=">
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
        subject: isRegistration ? "Création de compte" : "Demande de connexion",
        html: isRegistration ? accountCreationTemplate(connectionToken) : connectionTemplate(connectionToken, username)
    });
}