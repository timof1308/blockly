# Headless blockly operation

Simulate the "import-export action" in the Lab.
Due to various changes made to NEPO blockly throughout the years, old XMLs are in some cases different to the newer versions of XML. Some block types are mapped to different ones, some blocks have additional or changed fields, etc..
This file replicates the "import-export action" that applies these changes to the XML.
In order to validate the XSLT changes serverside (which replace the need for blockly mappings) this can be used to independently generate new XMLs from old ones. These can then be used to check the XSLT output.

Requires node and closure-library (tag v20200101 works).

To use run `node transform.js -f|-nf <input> [output-file]`. With `-f` the `<input>` parameter will be interpreted as a filename, with `-nf` as XML directly (`"` should be escaped). `output-file` can be optionally specified to write the output to a file instead of the output.