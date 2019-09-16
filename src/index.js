// External dependencies
import React from 'react';
// Internal dependencies
import * as serviceWorker from './serviceWorker';
import {RouterService} from './script/services/router.service'

// Start watching URL change
RouterService.watchRoutes();
serviceWorker.unregister();
