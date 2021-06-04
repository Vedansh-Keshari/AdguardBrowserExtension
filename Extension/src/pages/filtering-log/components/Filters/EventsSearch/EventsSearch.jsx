import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { rootStore } from '../../../stores/RootStore';
import { Icon } from '../../../../common/components/ui/Icon';
import { reactTranslator } from '../../../../../common/translators/reactTranslator';

import './events-search.pcss';

const EventsSearch = observer(() => {
    const { logStore } = useContext(rootStore);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const changeHandler = (e) => {
        logStore.setEventsSearchValue(e.currentTarget.value);
    };

    const handleClear = () => {
        logStore.setEventsSearchValue('');
    };

    return (
        <form
            className="events-search"
            onSubmit={onSubmit}
        >
            <input
                type="text"
                id="events-search"
                name="events-search"
                placeholder={reactTranslator.getMessage('filtering_log_search_string')}
                onChange={changeHandler}
                value={logStore.eventsSearchValue}
            />
            {logStore.eventsSearchValue
            && (
                <button
                    type="button"
                    className="events-search__clear"
                    onClick={handleClear}
                >
                    <Icon id="#cross" classname="events-search__cross" />
                </button>
            )}
        </form>
    );
});

export { EventsSearch };