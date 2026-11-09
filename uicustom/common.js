
const Imported          = window.opener ? window.opener.Imported : null;
const RpgMakerUtils     = window.opener ? window.opener.Utils : null;
const RpgMakerName      = RpgMakerUtils ? RpgMakerUtils.RPGMAKER_NAME : 'MZ';
const UICustom          = window.opener ? window.opener.UICustom : null;


$(document).ready(() => $(RpgMakerName == 'MZ' ? '.mv' : '.mz').hide());

$(document).ready(() =>
    $('.initially-hidden')
        .css('display', 'none')
        .removeClass('initially-hidden')
);

const hexColors = [
    '#ffffff',
    '#20A0D6',
    '#FF784C',
    '#66CC40',
    '#99CCFF',
    '#CCC0FF',
    '#FFFFA0',
    '#808080',
    '#C0C0C0',
    '#2080CC',
    '#FF3810',
    '#00A010',
    '#3E9ADE',
    '#A098FF',
    '#FFCC20',
    '#000000',
    '#84AAFF',
    '#FFFF40',
    '#FF2020',
    '#202040',
    '#E08040',
    '#F0C040',
    '#4080C0',
    '#40C0F0',
    '#80FF80',
    '#C08080',
    '#8080FF',
    '#FF80FF',
    '#00A040',
    '#00E060',
    '#A060E0',
    '#C080FF',
];

function colorCodeToHex(color) {
    return hexColors[color] || '#ffffff';
}

function setupSwitches() {
    $('.switch').each((_, element) => {
        const labelText = $(element).text();
        $(element).text('');

        const input = $('<input>');

        input
            .addClass('form-check-input')
            .attr('type', 'checkbox')
            .attr('id', $(element).data('config-field'))
            .on('change', () => {
                const checked = input.prop('checked');
                const onchange = $(element).data('onchange');

                if (onchange) {
                    window[onchange](checked);
                } else {
                    changeBoolean($(element).data('config-field'), checked);
                }
            });

        $(element)
            .append($('<label></label>')
                .addClass('form-check form-switch')
                .append(input)
                .append($('<label></label>')
                    .addClass('form-check-label')
                    .attr('for', $(element).data('config-field'))
                    .text(labelText)))
    });
}

function setupTextColorPickers() {
    $('.text-color-picker').each((_, element) => {
        const span = $('<span></span>')
            .addClass('input-group-text')
            .attr('id', $(element).data('config-field') + 'Span')
            .css({
                'font-size': 'larger',
                'text-decoration': 'underline',
                'text-decoration-thickness': '4px'
            })
            .text('A');
        
        const select = $('<select></select>')
            .addClass('input-group-text form-select')
            .attr('id', $(element).data('config-field'))
            .css('width', '4rem')
            .on('change', () => onTextColorChange($(element).data('config-field'), select.val()));
        
        hexColors.forEach((hex, i) => select.append($('<option></option>')
            .val(i)
            .css('background-color', hex)
        ));

        $(element)
            .addClass('d-flex')
            .append($('<div></div>')
                .addClass('input-group')
                .addClass('me-2')
                .css('width', 'fit-content')
                .append(span)
                .append(select))
                .append($('<button></button>')
                    .addClass('btn btn-outline-secondary')
                    .append($('<i></i>').addClass('bi bi-arrow-counterclockwise'))
                    .on('click', () => onTextColorReset($(element).data('config-field')))
        );
    });
}

function changeTextColor(elementId, textColor) {
    $('#' + elementId + 'Span').css('text-decoration-color', colorCodeToHex(textColor));
}

function onTextColorChange(elementId, textColor) {
    changeTextColor(elementId, textColor);

    config[elementId] = Number(textColor);
    onSave();
}

function onTextColorReset(elementId) {
    changeTextColor(elementId, getTemplate()[elementId]);

    config[elementId] = undefined;
    onSave();
}

function setup9DirButtons() {
    $('.9-dir').each((_, element) => {
        const configField = $(element).data('config-field');
        const noCenter = $(element).hasClass('no-center');

        const button = (iconClass, direction) => $('<button></button>')
            .addClass('btn w-100')
            .attr('id', configField + capitalizeFirstLetter(direction))
            .append($('<i></i>').addClass('bi ' + iconClass))
            .on('click', () => change9Dir(configField + capitalizeFirstLetter(direction)));

        const buttonDiv = (iconClass, direction) => $('<div></div>')
            .addClass('col-4')
            .append(button(iconClass, direction));
        
        const emptyDiv = () => $('<div></div>').addClass('col-4');

        $(element)
            .addClass('row mb-4 g-2')
            .css('width', '10rem')
            .append(buttonDiv('bi-arrow-up-left',       'topLeft'))
            .append(buttonDiv('bi-arrow-up',            'topCenter'))
            .append(buttonDiv('bi-arrow-up-right',      'topRight'))
            .append(buttonDiv('bi-arrow-left',          'middleLeft'))
            .append(noCenter ? emptyDiv() : buttonDiv('bi-fullscreen', 'middleCenter'))
            .append(buttonDiv('bi-arrow-right',         'middleRight'))
            .append(buttonDiv('bi-arrow-down-left',     'bottomLeft'))
            .append(buttonDiv('bi-arrow-down',          'bottomCenter'))
            .append(buttonDiv('bi-arrow-down-right',    'bottomRight'))
    });
}

function setupPageElements() {
    setupSwitches();
    setupTextColorPickers();
    setupIconPickers();
    setup9DirButtons();
}


var config = { };

$(document).ready(() => {
    setupPageElements();

    if (window.opener) {
        loadConfig();
    } else {
        config = getTemplate();

        syncFormInputs();
    }
});

function loadConfig() {
    readFile(
        'uicustom/' + CONFIG_NAME,
        (data) => Object.assign(config, data),
        () => config = getTemplate(),
        () => syncFormInputs(),
    );
}

function onQuickTemplate(template) {
    config = getTemplate(template);

    syncFormInputs();
    onSave();
}

function onRestoreDefaults() {
    onQuickTemplate(null);
}

function changeText(key, value) {
    config[key] = value !== '' ? value : undefined;
    onSave();
}

function changeNumber(key, value) {
    config[key] = value !== '' ? Number(value) : undefined;
    onSave();
}

function changeBoolean(key, checked) {
    config[key] = checked;
    onSave();
}

function changeFile(key, folder, file) {
    config[key] = userFileToLocalFile(folder, file);
    onSave();
}

function userFileToLocalFile(folder, filepath) {
    return filepath
        ? folder + '/' + filepath.replace(/\\/g, '/').split('/' + folder + '/')[1]
        : null;
}

function changeTextAlign(fullElementId) {
    changeButtonGroup(fullElementId, ['left', 'center', 'right']);
}

function changeVertAlign(fullElementId) {
    changeButtonGroup(fullElementId, ['top', 'middle', 'bottom']);
}

function change9Dir(fullElementId) {  
    const directions = [
        'topLeft',      'topCenter',        'topRight',
        'middleLeft',   'middleCenter',     'middleRight',
        'bottomLeft',   'bottomCenter',     'bottomRight',
    ];

    changeButtonGroup(fullElementId, directions);
}

function changeButtonGroup(fullElementId, buttons) {
    const activeButton = buttons.find(item => fullElementId.toLowerCase().includes(item.toLowerCase()));

    if (activeButton) {
        const key = fullElementId.slice(0, fullElementId.length - activeButton.length);
        config[key] = activeButton;

        toggleButtons('#' + key, buttons, activeButton);
        onSave();
    }
}

function toggle9DirButtons(elementId, selectedValue) {
    toggleButtons(
        elementId,
        [
            'topLeft',      'topCenter',        'topRight',
            'middleLeft',   'middleCenter',     'middleRight',
            'bottomLeft',   'bottomCenter',     'bottomRight',
        ],
        selectedValue,
    );
}

function toggleButtons(elementId, values, selectedValue) {
    values.forEach((value) => toggleButton(
        elementId + capitalizeFirstLetter(value),
        value == selectedValue,
    ));
}

function toggleButton(elementId, b) {
    b
        ? $(elementId).removeClass('btn-outline-primary').addClass('btn-primary')
        : $(elementId).removeClass('btn-primary').addClass('btn-outline-primary');
}

function toggleVisibility(elementId, b) {
    b
        ? $(elementId).show()
        : $(elementId).hide();
}

function toggleEnable(elementId, b) {
    $(elementId).prop('disabled', !b);
}

function changeColor(key, value) {
    changeText(key, value);
}

function onResetGaugeColor(type) {
    window['gaugeColor' + type + '1'].value = getTemplate()['gaugeColor' + type + '1'];
    window['gaugeColor' + type + '2'].value = getTemplate()['gaugeColor' + type + '2'];

    config['gaugeColor' + type + '1'] = getTemplate()['gaugeColor' + type + '1'];
    config['gaugeColor' + type + '2'] = getTemplate()['gaugeColor' + type + '2'];
    onSave();
}

function onResetGaugeBackgroundColor(type) {
    window['gaugeBackgroundColor' + type].value = getTemplate()['gaugeBackgroundColor' + type];

    config['gaugeBackgroundColor' + type] = getTemplate()['gaugeBackgroundColor' + type];
    onSave();
}

function onHelpWindowBackgroundTypeChange(type) {
    toggleVisibility('#helpWindowBackgroundFileBox', 'image' == type);
    
    config.helpWindowBackgroundType = type;
    onSave();
}

function onOverrideHelpWindowChange(checked) {
    toggleVisibility('#helpWindowFileBox', checked);
    
    config.overrideHelpWindowSkin = checked;
    onSave();
}

function syncLayout2Fields(windowTypes) {
    windowTypes.forEach(windowType => {
        const key = `override${capitalizeFirstLetter(windowType)}Rectangle`;
        window[key].checked = config[key];

        toggleVisibility(`#${windowType}RectangleByValuesBox`, config[key]);

        ['x', 'y', 'width', 'height']
            .map(prop => `${windowType}Rectangle_${prop}`)
            .forEach(key => window[key].value = config[key]);
    });
}

function onAutoAdjustVisibleActorsChange(checked) {
    toggleVisibility('#visibleActorsWave', checked);
    toggleVisibility('#visibleActorsMax', checked);
    
    config.autoAdjustVisibleActors = checked;
    onSave();
}

function onOverrideCommandRectangleChange(checked) {
    toggleVisibility('#commandRectangleByValuesBox', checked);
    
    config.overrideCommandRectangle = checked;
    onSave();
}

function onOverrideStatusRectangleChange(checked) {
    toggleVisibility('#statusRectangleByValuesBox', checked);

    config.overrideStatusRectangle = checked;
    onSave();
}

function onOverrideGoldRectangleChange(checked) {
    toggleVisibility('#goldRectangleByValuesBox', checked);

    config.overrideGoldRectangle = checked;
    onSave();
}

function onOverrideSlotRectangleChange(checked) {
    toggleVisibility('#slotWindowRectangleByValuesBox', checked);

    config.overrideSlotWindowRectangle = checked;
    onSave();
}

function onOverrideInventoryRectangleChange(checked) {
    toggleVisibility('#inventoryRectangleByValuesBox', checked);

    config.overrideInventoryRectangle = checked;
    onSave();
}

function onOverrideHelpRectangleChange(checked) {
    toggleVisibility('#helpRectangleByValuesBox', checked);

    config.overrideHelpRectangle = checked;
    onSave();
}

function onOverrideCategoryRectangleChange(checked) {
    toggleVisibility('#categoryRectangleByValuesBox', checked);

    config.overrideCategoryRectangle = checked;
    onSave();
}

function onOverrideItemListRectangleChange(checked) {
    toggleVisibility('#itemListRectangleByValuesBox', checked);

    config.overrideItemListRectangle = checked;
    onSave();
}

function onOverrideItemDetailRectangleChange(checked) {
    toggleVisibility('#itemDetailRectangleByValuesBox', checked);

    config.overrideItemDetailRectangle = checked;
    onSave();
}

function onOverrideSkillTypesRectangleChange(checked) {
    toggleVisibility('#skillTypesRectangleByValuesBox', checked);

    config.overrideSkillTypesRectangle = checked;
    onSave();
}

function onOverrideSkillListRectangleChange(checked) {
    toggleVisibility('#skillListRectangleByValuesBox', checked);

    config.overrideSkillListRectangle = checked;
    onSave();
}

function onLayout2ValueChange(windowType, prop, value) {
    const key = `${windowType}Rectangle_${prop}`;

    changeNumber(key, value);
}

function gamePluginsList() {
    return window.opener ? window.opener.PluginManager._scripts : [ ];
}

function hasPlugin(pluginName) {
    return gamePluginsList().includes(pluginName);
}

function isPluginCollectionBelowMK(pluginNamePrefix) {
    const plugins           = gamePluginsList();
    const pluginIndex       = plugins.findIndex(script => script.includes(pluginNamePrefix));
    const thisPluginIndex   = plugins.findIndex(script => script.includes('MK_UICustomizer'));

    return pluginIndex > thisPluginIndex;
}

function checkPluginParameter(pluginName, parameterName, valueToCheck) {
    if (window.opener) {
        const params = window.opener.PluginManager.parameters(pluginName);
        return params && params[parameterName] === valueToCheck;
    }
    return false;
}


function readFile(filePath, f, error, then) {
    try {
        const fs = require('fs');
        fs.readFile(filePath, 'utf-8', (_, data) => {
            if (data) {
                f(JSON.parse(data));
            } else {
                error();
            }
            then();
        });
    } catch (_) {
        error();
        then();
    }
}

function writeFile(filepath, data) {
    const fs = require('fs');
    fs.writeFile(
        filepath,
        JSON.stringify(data, null, 2),
        'utf-8',
        (error) => error && alert("Something went wrong: " + error),
    );
}

function fetchLatestVersion(currentVersion, extractVersionOnServer) {
    $.ajax({
        url:        'http://downloads.aerosys.blog/plugins/news.json',
        type:       'GET',
        dataType:   'json',
        timeout:    5000,
        cache:      false,
        error:      () => ({ }),
        success:    (data) => {
            const versionOnServer = extractVersionOnServer(data);

            if (versionOnServer && !compareVersions(currentVersion, versionOnServer)) {
                $('#newVersionAvailableBox').show();
                $('#newVersionAvailableMessage').text("A new version of this plugin is available: " + versionOnServer);
            }
        },
    });
}

function capitalizeFirstLetter(string) {
    if (!string || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function compareVersions(a, b) {
    if (typeof a !== 'string') return false;
    if (typeof b !== 'string') return false;

    for (let i = 0; i < 3; i++) {
        if (Number(a.split('.')[i]) > Number(b.split('.')[i])) {
            return true;
        }
        if (Number(a.split('.')[i]) < Number(b.split('.')[i])) {
            return false;
        }
    }
    return true;
}

let currentTargetInput          = null;
let currentIconPickerConfigKey  = null;
let selectedIconIndex           = null;

const ICONS_PER_ROW = 16;

const ICON_SIZE = window && window.opener && window.opener.$dataSystem && window.opener.$dataSystem.iconSize
    ? window.opener.$dataSystem.iconSize
    : 32;


function initIconPicker() {
    const sprite = document.getElementById('iconSprite');

    sprite.addEventListener('click', e => {
        selectedIconIndex = getHighlightedIconIndex(e);
        moveIconHighlight(selectedIconIndex);
    });

    sprite.addEventListener('dblclick', e => {
        const iconIndex = getHighlightedIconIndex(e);

        if (typeof iconIndex == 'number') {
            selectedIconIndex = iconIndex;
            onChooseIconConfirm();
        }
    });
}

$(document).ready(() => {
    initIconPicker();
    
    /*
    $('.choose-icon').on('click', e => {
        currentTargetInput          = document.querySelector(e.currentTarget.dataset.target);
        currentIconPickerConfigKey  = e.currentTarget.dataset.configField;
        selectedIconIndex           = config[currentIconPickerConfigKey] || 0;
        
        moveIconHighlight(selectedIconIndex);

        $('#iconPickerModal').modal('show');
    });
    */
});

function getHighlightedIconIndex(e) {
    const rect  = e.target.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const col   = Math.floor(x / ICON_SIZE);
    const row   = Math.floor(y / ICON_SIZE);
    
    return row * ICONS_PER_ROW + col;
}

function moveIconHighlight(index) {
    const highlight = document.getElementById('highlight');
    
    highlight.style.left        = ((index % ICONS_PER_ROW) * ICON_SIZE) + "px";
    highlight.style.top         = (Math.floor(index / ICONS_PER_ROW) * ICON_SIZE) + "px";
    highlight.style.display     = "block";
}

function onChooseIconConfirm() {
    closeIconPicker();
    
    if (currentTargetInput) {
        currentTargetInput.value = selectedIconIndex;
        changeNumber(currentIconPickerConfigKey, selectedIconIndex);
    }
}

function closeIconPicker() {
    $('#iconPickerModal').modal('hide');
}

function setupIconPickers() {
    $('.icon-picker').each((_, element) => {
        const isLargeLabel = $(element).hasClass('large-label');

        const span = $('<span></span>')
            .addClass('input-group-text')
            .addClass('d-flex align-items-center')
            .addClass(isLargeLabel ? 'justify-content-end' : ' justify-content-center')
            .css('width', isLargeLabel ? '8rem' : '4rem')
            .text($(element).data('label'));
        
        const input = $('<input>')
            .addClass('form-control')
            .attr('type', 'text')
            .attr('readonly', true)
            .attr('id', $(element).data('config-field'));
        
        const button = $('<button></button>')
            .addClass('btn btn-outline-secondary')
            .append($('<i></i>').addClass('bi bi-box-arrow-up-right'))
            .on('click', () => {
                currentTargetInput = input[0];
                currentIconPickerConfigKey = $(element).data('config-field');
                selectedIconIndex = config[currentIconPickerConfigKey] || 0;

                moveIconHighlight(selectedIconIndex);

                $('#iconPickerModal').modal('show');
            });

        $(element)
            .addClass('input-group')
            .css('width', isLargeLabel ? '16rem' : '12rem')
            .append(span)
            .append(input)
            .append(button);
    })
}
