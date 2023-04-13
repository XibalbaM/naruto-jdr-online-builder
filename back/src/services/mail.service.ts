import nodemailer from "nodemailer";

import config from "../config/env.js";

const transporter = nodemailer.createTransport(config.loginEmail.transport);

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
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px"><img class="adapt-img"
                                                                                                                                                  src="AREMPLACERQUANDASSETSDONE"
                                                                                                                                                  alt=""
                                                                                                                                                  style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                                                                                                  width="50"></td>
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
                                                                                                                                          href="${config.loginUrl + connectionToken}">${config.loginUrl + connectionToken}</a></span></strong>
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
                                                                                                                   href="AREMPLACER">contactez nous ici</a>.</p></td>
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
                                              <img class="adapt-img"
                                                   src="AREMPLACERQUANDASSETSDONE"
                                                   alt=""
                                                   style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                   width="30">
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

const connectionTemplate = (connectionToken: string) => {
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
                                            <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:40px;font-size:0px"><img class="adapt-img"
                                                                                                                                                  src="AREMPLACERQUANDASSETSDONE"
                                                                                                                                                  alt=""
                                                                                                                                                  style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                                                                                                  width="50"></td>
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
                                                <strong style="color: #030505">Hello (USERNAME) ! Ravi de te revoir parmi nous.</strong></h1></td>
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
                                                                                                                                          href="${config.loginUrl + connectionToken}">${config.loginUrl + connectionToken}</a></span></strong>
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
                                                                                                                   href="AREMPLACER">contactez nous ici</a>.</p></td>
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
                                              <img class="adapt-img"
                                                   src="AREMPLACERQUANDASSETSDONE"
                                                   alt=""
                                                   style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                   width="30">
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

export async function sendConnectionEmail(to: string, connectionToken: string, isRegistration: boolean) {

    console.log(`Sending connection email to ${to} with token ${connectionToken} as ${isRegistration ? "registration" : "connection"}`);

    await transporter.sendMail({
        from: config.loginEmail.username,
        to: to,
        subject: isRegistration ? "Inscription" : "Connexion",
        html: isRegistration ? accountCreationTemplate(connectionToken) : connectionTemplate(connectionToken)
    });
}