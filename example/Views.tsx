import * as React from "react";
import { Component } from "react";
import Scheduler, {
    SchedulerData,
    SchedulerViewTypes,
    SchedulerEvent,
} from "../src/Scheduler";
import * as ExampleFunction from "./utils/ExampleFunctions";
import { DemoData } from "./utils/DemoData";
import Nav from "./utils/Nav";
import withDragDropContext from "./utils/withDnDContext";

class Basic extends Component<{}, { viewModel: SchedulerData }> {
    constructor(props: Readonly<{}>) {
        super(props);

        const schedulerData = new SchedulerData(ExampleFunction.getNow(), SchedulerViewTypes.Month, false, false, {
            eventItemPopoverEnabled: false,
            views: [
                { viewName: "Resource View", viewType: SchedulerViewTypes.Month, showAgenda: false, isEventPerspective: false },
                { viewName: "Task View", viewType: SchedulerViewTypes.Month, showAgenda: false, isEventPerspective: true },
            ],
        });
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.eventsForTaskView);
        this.state = {
            viewModel: schedulerData,
        };
    }

    public render() {
        const { viewModel } = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{ textAlign: "center" }}>3 View Types (take month for example)</h3>
                    <Scheduler schedulerData={viewModel}
                        prevClick={ExampleFunction.prevClick.bind(this)}
                        nextClick={ExampleFunction.nextClick.bind(this)}
                        onSelectDate={ExampleFunction.onSelectDate.bind(this)}
                        onViewChange={ExampleFunction.onViewChange.bind(this)}
                        eventItemClick={ExampleFunction.eventClicked.bind(this)}
                        viewEventClick={ExampleFunction.ops1.bind(this)}
                        viewEventText="Ops 1"
                        viewEvent2Text="Ops 2"
                        viewEvent2Click={ExampleFunction.ops2.bind(this)}
                        updateEventStart={ExampleFunction.updateEventStart.bind(this)}
                        updateEventEnd={ExampleFunction.updateEventEnd.bind(this)}
                        moveEvent={ExampleFunction.moveEvent.bind(this)}
                        newEvent={ExampleFunction.newEvent.bind(this)}
                        toggleExpandFunc={ExampleFunction.toggleExpandFunc.bind(this)}
                        onSetAddMoreState={ExampleFunction.onSetAddMoreState.bind(this)}
                    />
                </div>
            </div>
        );
    }

    public subtitleGetter = (schedulerData: SchedulerData, event: SchedulerEvent) => {
        return schedulerData.isEventPerspective ? schedulerData.getResourceById(event.resourceId).name : event.groupName;
    }
}

export default withDragDropContext(Basic);
