<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <h1>Employee Details</h1>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phones</th>
                        <th>Addresses</th>
                    </tr>
                    <xsl:for-each select="//employee">
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td>
                                <xsl:for-each select="phones/phone">
                                    <xsl:value-of select="concat(., ' (', @type, ')')"/>
                                    <br/>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:for-each select="addresses/address">
                                    <xsl:value-of select="concat(street, ', ', buildingnumber, ', ', region, ', ', city, ', ', country)"/>
                                    <br/>
                                </xsl:for-each>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
