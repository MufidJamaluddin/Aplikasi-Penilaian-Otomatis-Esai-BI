export function calcTimeDelta(date: any, ...args: any[]): any;
export default class _default {
  static defaultProps: {
    autoStart: boolean;
    controlled: boolean;
    daysInHours: boolean;
    intervalDelay: number;
    precision: number;
    zeroPadTime: number;
  };
  constructor(props: any);
  calcOffsetStart(): any;
  calcTimeDelta(): any;
  clearInterval(): void;
  componentDidMount(): void;
  componentDidUpdate(prevProps: any): void;
  componentWillUnmount(): void;
  forceUpdate(callback: any): void;
  getApi(): any;
  getRenderProps(): any;
  render(): any;
  setState(partialState: any, callback: any): void;
  setTimeDeltaState(delta: any): any;
}
export default namespace _default {
  namespace propTypes {
    function autoStart(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace autoStart {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function controlled(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace controlled {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function date(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    function daysInHours(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace daysInHours {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function intervalDelay(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace intervalDelay {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function now(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace now {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onComplete(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onComplete {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onMount(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onMount {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onPause(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onPause {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onStart(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onStart {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onTick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onTick {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function precision(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace precision {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function renderer(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace renderer {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function zeroPadDays(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace zeroPadDays {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function zeroPadTime(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace zeroPadTime {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export function formatTimeDelta(delta: any, options: any): any;
export function zeroPad(value: any, ...args: any[]): any;
