import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { SettingsSection } from '../Settings/SettingsSection';
import { SettingsSetCheckbox } from '../Settings/SettingsSetCheckbox';
import { SETTINGS_TYPES } from '../Settings/Setting';
import { messenger } from '../../../services/messenger';
import { rootStore } from '../../stores/RootStore';
import { log } from '../../../../common/log';
import { reactTranslator } from '../../../../common/translators/reactTranslator';

const Miscellaneous = observer(() => {
    const {
        settingsStore,
        uiStore,
    } = useContext(rootStore);

    const { settings } = settingsStore;

    if (!settings) {
        return null;
    }

    // eslint-disable-next-line max-len
    const COLLECT_HITS_LEARN_MORE_URL = 'https://adguard.com/forward.html?action=filter_rules&from=options_screen&app=browser_extension';

    const settingChangeHandler = async ({ id, data }) => {
        log.info(`Setting ${id} set to ${data}`);
        await settingsStore.updateSetting(id, data);
    };

    const handleFilteringLogClick = async () => {
        await messenger.openFilteringLog();
    };

    const handleResetStatisticsClick = async () => {
        await messenger.resetStatistics();
        uiStore.addNotification({ description: reactTranslator.getMessage('options_reset_stats_done') });
    };

    const {
        USE_OPTIMIZED_FILTERS,
        DISABLE_COLLECT_HITS,
        DISABLE_SHOW_CONTEXT_MENU,
        DISABLE_SHOW_ADGUARD_PROMO_INFO,
        DISABLE_SHOW_APP_UPDATED_NOTIFICATION,
        DISABLE_SHOW_PAGE_STATS,
        DEFAULT_ALLOWLIST_MODE,
    } = settings.names;

    return (
        <>
            <SettingsSection title={reactTranslator.getMessage('context_miscellaneous_settings')}>
                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_use_optimized_filters')}
                    description={reactTranslator.getMessage('options_use_optimized_filters_desc')}
                    disabled={!settings.values[USE_OPTIMIZED_FILTERS]}
                    id={USE_OPTIMIZED_FILTERS}
                    label={reactTranslator.getMessage('options_use_optimized_filters')}
                    type={SETTINGS_TYPES.CHECKBOX}
                    value={settings.values[USE_OPTIMIZED_FILTERS]}
                    handler={settingChangeHandler}
                />
                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_allowlist_invert')}
                    description={reactTranslator.getMessage('options_allowlist_invert_desc')}
                    id={DEFAULT_ALLOWLIST_MODE}
                    label={reactTranslator.getMessage('options_allowlist_invert')}
                    type={SETTINGS_TYPES.CHECKBOX}
                    value={settings.values[DEFAULT_ALLOWLIST_MODE]}
                    handler={settingChangeHandler}
                    inverted
                />
                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_collect_hit_stats_title')}
                    description={(
                        <a
                            href={COLLECT_HITS_LEARN_MORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {reactTranslator.getMessage('options_learn_more')}
                        </a>
                    )}
                    disabled={settings.values[DISABLE_COLLECT_HITS]}
                    id={DISABLE_COLLECT_HITS}
                    type={SETTINGS_TYPES.CHECKBOX}
                    label={reactTranslator.getMessage('options_collect_hit_stats_title')}
                    inverted
                    value={settings.values[DISABLE_COLLECT_HITS]}
                    handler={settingChangeHandler}
                />

                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_show_blocked_ads_count_title')}
                    disabled={settings.values[DISABLE_SHOW_PAGE_STATS]}
                    id={DISABLE_SHOW_PAGE_STATS}
                    type={SETTINGS_TYPES.CHECKBOX}
                    label={reactTranslator.getMessage('options_show_blocked_ads_count_title')}
                    inverted
                    value={settings.values[DISABLE_SHOW_PAGE_STATS]}
                    handler={settingChangeHandler}
                />

                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_show_context_menu_title')}
                    disabled={settings.values[DISABLE_SHOW_CONTEXT_MENU]}
                    id={DISABLE_SHOW_CONTEXT_MENU}
                    type={SETTINGS_TYPES.CHECKBOX}
                    label={reactTranslator.getMessage('options_show_context_menu_title')}
                    inverted
                    value={settings.values[DISABLE_SHOW_CONTEXT_MENU]}
                    handler={settingChangeHandler}
                />

                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_show_adguard_full_version_title')}
                    disabled={settings.values[DISABLE_SHOW_ADGUARD_PROMO_INFO]}
                    id={DISABLE_SHOW_ADGUARD_PROMO_INFO}
                    type={SETTINGS_TYPES.CHECKBOX}
                    label={reactTranslator.getMessage('options_show_adguard_full_version_title')}
                    inverted
                    value={settings.values[DISABLE_SHOW_ADGUARD_PROMO_INFO]}
                    handler={settingChangeHandler}
                />

                <SettingsSetCheckbox
                    title={reactTranslator.getMessage('options_show_app_updated_notification')}
                    disabled={settings.values[DISABLE_SHOW_APP_UPDATED_NOTIFICATION]}
                    id={DISABLE_SHOW_APP_UPDATED_NOTIFICATION}
                    type={SETTINGS_TYPES.CHECKBOX}
                    label={reactTranslator.getMessage('options_show_app_updated_notification')}
                    inverted
                    value={settings.values[DISABLE_SHOW_APP_UPDATED_NOTIFICATION]}
                    handler={settingChangeHandler}
                />
                <button
                    type="button"
                    className="button button--list"
                    onClick={handleFilteringLogClick}
                >
                    {reactTranslator.getMessage('options_open_log')}
                </button>
                <button
                    type="button"
                    className="button button--list button--red"
                    onClick={handleResetStatisticsClick}
                >
                    {reactTranslator.getMessage('options_reset_stats')}
                </button>
            </SettingsSection>
        </>
    );
});

export { Miscellaneous };