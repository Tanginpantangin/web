/* global Model,Stack */
'use strict';
if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.TransToTransPaxalih = function() {
    var self = this;
    var base = new window.cam.service.Paxalih();

    self.DoConvert = function(data, sourceType, destitionType) {
        // Validate inputed string
        var validvar = [data];
        base.ValidateInput(validString, sourceType);
        data = validString[0];

        //Contain converted
        var converted = [];

        //Trig newline character
        //    data = data.Replace(Model.Constant.NEW_LINE, ' ' + Model.Constant.NEW_LINE + ' ');
        data = data.replace(/(?:\r\n|\r|\n)/g, ' \n ');

        //Plit to words array
        var words = data.split(' ');

        //Convert processing
        words.forEach(function(word) {
            // is newline character
            if (word == Model.Constant.NEW_LINE || !word) {
                converted.push(word);
                return;
            }

            var convertedWord = '';
            switch (sourceType) {
                case Model.Enum.TransInrasara:
                    convertedWord = self.InrasaraToCamEFEOByWord(word);
                    break;

                case Model.Enum.TransCamEFEO:
                    convertedWord = self.CamEFEOToInrasaraByWord(word);
                    break;

                default:
                    //case Model.Enum.TransKawomTT:
                    if (destitionType == Model.Enum.TransCamEFEO) {
                        convertedWord = self.KTTToCamEFEOByWord(word);
                        break;
                    } else //if (destitionType == Model.Enum.TransInrasara)
                    {
                        convertedWord = self.KTTToInrasaraByWord(word);
                        break;
                    }
            }

            converted.push(convertedWord);
        });

        var result = converted.join(' ').toLowerCase();

        //Trig newline character
        // result = result.Replace(' ' + Model.Constant.NEW_LINE + ' ', Model.Constant.NEW_LINE);

        return result.split('\n');
    };

    self.InrasaraToCamEFEOByWord = function(word) {
        var result = word;
        var hashInra2EFEO = [];
        hashInra2EFEO.push('nhj', 'nj');
        hashInra2EFEO.push('bb', 'mb');
        hashInra2EFEO.push('ư', 'â');
        hashInra2EFEO.push('e', 'é');
        hashInra2EFEO.push('au', 'ao');

        try {
            foreach(DictionaryEntry entry in hashInra2EFEO) {
                if (!result.Contains('ei')) {
                    result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
                }
            }
            result = result.Replace('ơ', 'e');
            result = result.Replace('nh', 'ny');

            //Akhar wak
            if (result.Contains('w')) {
                int idex = result.IndexOf('w');
                var str_check = 'aưiu';
                if ((idex != result.Length - 1) && (idex != 0) && !(str_check.Contains(result[idex - 1].ToString()))) {
                    result = result.Replace('w', 'u');
                }
            }

            return result;
        } catch (Exception ex) {

            Service.Log.WriteLog(ex);
            return String.Empty;
        }
    }

    /// <summary>
    /// Covert from Cam EFEO Trans To Inrasara Trans by word
    /// </summary>
    /// <param name='word'>word</param>
    private var CamEFEOToInrasaraByWord(var word) {
        var result = word;
        Hashtable hashEFEO2Inra = new Hashtable();
        hashEFEO2Inra.push('nj', 'nhj');
        hashEFEO2Inra.push('ny', 'nh');
        hashEFEO2Inra.push('mb', 'bb');
        hashEFEO2Inra.push('â', 'ư');
        hashEFEO2Inra.push('e', 'ơ');

        try {
            foreach(DictionaryEntry entry in hashEFEO2Inra) {
                if (!result.Contains('ei')) {
                    result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
                }
            }

            //Akhar wak
            if (result.Contains('u')) {
                int idex = result.IndexOf('u');
                var str_check = 'aie';
                if ((idex != result.Length - 1) && (idex != 0) && (str_check.Contains(result[idex + 1].ToString()))) {
                    result = result.Replace('u', 'w');
                }
            }

            result = result.Replace('é', 'e');
            result = result.Replace('ao', 'au');

            return result;
        } catch (Exception ex) {

            Service.Log.WriteLog(ex);
            return String.Empty;
        }
    }

    /// <summary>
    /// Covert from KTTT Trans To EFEO Trans by word
    /// </summary>
    /// <param name='word'>word</param>
    private var KTTToCamEFEOByWord(var word) {
        var result = word.ToLower();
        Hashtable hashKTTT2EFEO = new Hashtable();
        hashKTTT2EFEO.push('nhj', 'nj');
        hashKTTT2EFEO.push('nh', 'ny');
        hashKTTT2EFEO.push('bb', 'mb');
        hashKTTT2EFEO.push('đ', 'nd');
        hashKTTT2EFEO.push('aa', 'a');
        hashKTTT2EFEO.push('ưư', 'â');
        hashKTTT2EFEO.push('uu', 'u');
        hashKTTT2EFEO.push('ơ', 'e');
        hashKTTT2EFEO.push('ơơ', 'e');
        hashKTTT2EFEO.push('ê', 'é');
        hashKTTT2EFEO.push('ô', 'o');
        hashKTTT2EFEO.push('oo', 'ao');
        hashKTTT2EFEO.push('ee', 'ai');

        Hashtable hashKTTT2EFEO_plus = new Hashtable();
        hashKTTT2EFEO_plus.push('e', 'ai');
        hashKTTT2EFEO_plus.push('o', 'ao');
        hashKTTT2EFEO_plus.push('ư', 'â');

        try {

            if (!result.Contains('ei') && !result.Contains('oo') && !result.Contains('ee') && !result.Contains('ưư')) {

                foreach(DictionaryEntry entry in hashKTTT2EFEO_plus) {
                    result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
                }
            }

            foreach(DictionaryEntry entry in hashKTTT2EFEO) {
                result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
            }

            if (result.Contains('w')) {
                int idex = result.IndexOf('w');
                var str_check = 'aâiu';
                if ((idex != result.Length - 1) && (idex != 0) && !(str_check.Contains(result[idex - 1].ToString()))) {
                    result = result.Replace('w', 'u');
                }
                //else

            }
            return result;
        } catch (Exception ex) {

            Service.Log.WriteLog(ex);
            return String.Empty;
        }
    }

    /// <summary>
    /// Covert from KTTT Trans To Inrasara Trans by word
    /// </summary>
    /// <param name='word'>word</param>
    private var KTTToInrasaraByWord(var word) {
        var result = word;
        Hashtable hashKTTT2Inra = new Hashtable();

        hashKTTT2Inra.push('aa', 'a');
        hashKTTT2Inra.push('ưư', 'ư');
        hashKTTT2Inra.push('uu', 'u');
        hashKTTT2Inra.push('ơơ', 'ơ');
        hashKTTT2Inra.push('ê', 'e');
        hashKTTT2Inra.push('ô', 'o');
        hashKTTT2Inra.push('oo', 'au');
        hashKTTT2Inra.push('ee', 'ai');

        Hashtable hashKTTT2Inra_plus = new Hashtable();
        hashKTTT2Inra_plus.push('e', 'ai');
        hashKTTT2Inra_plus.push('o', 'au');

        try {
            if (!result.Contains('ei') && !result.Contains('oo') && !result.Contains('ee')) {

                foreach(DictionaryEntry entry in hashKTTT2Inra_plus) {
                    result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
                }
            }

            foreach(DictionaryEntry entry in hashKTTT2Inra) {
                result = result.Replace(entry.Key.ToString(), entry.Value.ToString());
            }
            return result;
        } catch (Exception ex) {

            Service.Log.WriteLog(ex);
            return String.Empty;
        }
    }
}
