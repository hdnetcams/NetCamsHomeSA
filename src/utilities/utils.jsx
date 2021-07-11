/* eslint-disable */ 
import dateFormat from 'dateformat';

export const TRIGGERS = ['TL', 'EV', 'SE', 'PH', 'TH', 'LP'];
export const TRIGGERSS = ['TL', 'EV', 'SE', 'PH', 'TH', 'LP', 'S0'];
export const TRIGGER_CAPTIONS = {
  TL: 'Time-Lapse',
  EV: 'Events',
  SE: 'Selfies',
  PH: 'Photos',
  TH: 'Thermal',
  LP: 'License Plate',
};
export const TRIGGER_CAPTIONS_ICONS = {
  TL: '/i/TL35.png',
  EV: '/i/EV35.png',
  SE: '/i/SE35.png',
  PH: '/i/PH35.png',
  TH: '/i/TH35.png',
  LP: '/i/LP35.png',
};
export const TRIGGER_CAPTIONS_COLORS = {
  TL: '#0FB910',
  EV: '#F91C04',
  SE: '#3D8AF7',
  PH: '#BB44AD',
  TH: '#F4EB49',
  LP: '#BFBFBF',
};

export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// const func = 'Component';
// export const isDev = (React[func].name === func); // minified or not

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const dev = {

  log(...params) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log(...params);
    }
  },

  error(...params) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error(...params);
    }
  },

};

const Utils = {

  fileSize(size) {
    if ((size === null) || Number.isNaN(size)) return (null);
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / (1024 ** i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
  },

  dateFormat(ts, mask) {
    return (dateFormat(ts, mask));
  },

  dateFormatSideBar(ts) {
    // dateFormat(ts, "yyyy-mm-dd_HH-MM-ss.l");
    // Tue Nov 28 2020
    if (typeof ts === 'string') {
      const ix = ts.indexOf('-');
      const ts1 = ((ix === 4)
        ? new Date(ts.substr(0, 4), parseInt(ts.substr(5, 2), 10) - 1, ts.substr(8, 2))
        : new Date(ts.substr(0, 4), parseInt(ts.substr(4, 2), 10) - 1, ts.substr(6, 2)));
      return (dateFormat(ts1, 'ddd mmm dd yyyy'));
    }
    return (dateFormat(ts, 'ddd mmm dd yyyy'));
  },

  dateFormatSideBarX(ts0, add) {
    let ts = ts0;
    if (typeof ts === 'string') {
      const ix = ts.indexOf('-');
      ts = ((ix === 4)
        ? new Date(ts.substr(0, 4), parseInt(ts.substr(5, 2), 10) - 1, ts.substr(8, 2))
        : new Date(ts.substr(0, 4), parseInt(ts.substr(4, 2), 10) - 1, ts.substr(6, 2))
      );
    }
    const wday = dateFormat(ts, 'ddd');
    const day = dateFormat(ts, 'dd');
    const mon = dateFormat(ts, 'mmm');

    return (
      <div className="flx">
        <div>
          <div className="rel">
            <div className="abs">
              {wday}
            </div>
          </div>
          <div className="hid">
            Wed
          </div>
        </div>
        <div className="ml4">
          <div className="rel">
            <div className="abs">
              {mon}
            </div>
          </div>
          <div className="hid">
            May
          </div>
        </div>
        <div className="ml4">
          {day}
        </div>
        <div className="ml4">{add}</div>
      </div>
    );
  },

  timeFormat(ts) {
    if (typeof ts === 'string') {
      let ix = ts.indexOf('-');
      if (ix === -1) {
        ix = ts.indexOf(':');
      }
      const ts1 = ((ix === 2)
        ? new Date(2000, 0, 1, ts.substr(0, 2), ts.substr(3, 2), ts.substr(6, 2))
        : new Date(2000, 0, 1, ts.substr(0, 2), ts.substr(2, 2), ts.substr(4, 2))
      );
      return (dateFormat(ts1, 'hh:MM:ss TT'));
    }
    return (dateFormat(ts, 'hh:MM:ss TT'));
  },

  addDashesToTS(ts) {
    if (!ts) return (ts);
    return (`${ts.substr(0, 2)}-${ts.substr(2, 2)}-${ts.substr(4, 10)}`);
  },

  addDashesToDT(dt) {
    if (!dt) return (dt);
    return (`${dt.substr(0, 4)}-${dt.substr(4, 2)}-${dt.substr(6, 10)}`);
  },

  addDashes(img) {
    if (!img) return (img);
    const dts = Utils.addDashesToDT(img.dt);
    const tss = Utils.addDashesToTS(img.ts);
    return ((dts ? `${dts}_` : '') + tss);
  },

  calcMinusDays(current, lastImage) {
    function parseDate(str) {
      const mdy = str.split('-');
      return new Date(mdy[0], mdy[1] - 1, parseInt(mdy[2], 10));
    }
    const result = Math.floor((parseDate(current) - parseDate(lastImage)) / (1000 * 60 * 60 * 24));
    if (result === 0) return (null);
    return (result);
  },

  parseDate(ts0) {
    let ts = ts0;
    if (typeof ts === 'string') {
      const ix = ts.indexOf('-');
      ts = ((ix === 4)
        ? new Date(ts.substr(0, 4), parseInt(ts.substr(5, 2), 10) - 1, ts.substr(8, 2))
        : new Date(ts.substr(0, 4), parseInt(ts.substr(4, 2), 10) - 1, ts.substr(6, 2))
      );
    }
    return (ts);
  },

  goFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  },

  // generate s3 URL for an image
  imgUrl(img, version, viewerData) {
    // const dts = viewerData.basicInfo.dt;
    const dts = Utils.addDashesToDT(img.dt) || viewerData.canonical.dt;
    const { prefix } = viewerData;
    return (
      `${prefix + viewerData.basicInfo.account_id}/${img.cid ?? viewerData.basicInfo.camera_id}/${dts}${((version !== 'o') && (version !== 'v')) ? `/${version}/` : '/'
      }${dts}_${Utils.addDashesToTS(img.ts)}_${img.id}${(version !== 'v') ? '.jpg' : '.mp4'}`
    );
  },

  imgUrlHome(img, version, j) {
    const dts = img.dt;
    const { prefix } = j;
    return (
      // eslint-disable-next-line prefer-template
      'https://storage0.netcams.io/' + img.account_id + '/' + img.camera_id + '/' + dts + (((version !== 'o') && (version !== 'v')) ? '/' + version + '/' : '/')
        + dts + '_' + Utils.addDashesToTS(img.ts) + '_' + img.image_id + ((version !== 'v') ? '.jpg' : '.mp4')
    );
  },

  isValidEmail(email) {
    return EMAIL_REGEX.test(email);
  },

  getLocalOption(user, key, session = false) {
    const userOptions = Utils.getLocalOptions(user, session);
    return (userOptions && userOptions[key] !== undefined) ? userOptions[key] : null;
  },

  setLocalOption(user, key, value, session = false) {
    const userOptions = Utils.getLocalOptions(user, session);
    userOptions[key] = value;
    localStorage.setItem(`${session ? 'session_' : ''}options_${user || ''}`, JSON.stringify(userOptions));
  },

  getLocalOptions(user, session = false) {
    const userOptions = JSON.parse(localStorage.getItem(`${session ? 'session_' : ''}options_${user || ''}`)) || {};
    if (session) {
      const sessionStarted = Utils.getCookieValue('session_started');
      if (userOptions.session_started === sessionStarted) {
        return (userOptions);
      }
      return ({ sessionStarted });
    }
    return (userOptions);
  },

  calcZoomData(info) {
    const result = { ...info };
    result.zoomLevel = result.zoomLevel ?? 500;
    const vpW = info.vpW ?? window.innerWidth;
    result.sidebarW = vpW < 768 ? 180 : 215; /// 215 / 180 (window < 768px)
    if (info.isSideBarHidden) result.sidebarW = 0;
    result.availW = vpW - result.sidebarW - 35;
    result.columns = Math.round(result.availW / result.zoomLevel);
    result.columnW = Math.floor(result.availW / result.columns);
    result.maxColumns = Math.floor(result.availW / 160);
    result.minColumns = 1;
    if ((info.direction > 0) && (result.columns > result.minColumns)) {
      // + clicked => decrease column count:
      result.newColumns = result.columns - 1;
      result.newZoomLevel = Math.round(result.availW / result.newColumns);
    }
    if ((info.direction < 0) && (result.columns < result.maxColumns)) {
      // - clicked => increase column count:
      result.newColumns = result.columns + 1;
      result.newZoomLevel = Math.round(result.availW / result.newColumns);
    }
    return (result);
  },

  getCookieValue(name) {
    // https://stackoverflow.com/a/25490531/7541598
    const r = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return r ? r.pop() : '';
  },

  /*
  shallowCompare(obj1, obj2) {
    return (
      Object.keys(obj1).length === Object.keys(obj2).length
      && Object.keys(obj1).every((key) => (
        Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key])
      )
    );
  },
  */

};

const ss = Utils.getCookieValue('session_started');
if (!ss) document.cookie = `session_started=${Date.now()};path=/`;

export default Utils;
