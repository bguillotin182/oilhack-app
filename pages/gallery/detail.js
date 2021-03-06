import MainLayout from "../../js/components/MainLayout";
import Link from "next/link";
import Viewer from "react-viewer";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { setImageListByBoardId } from "../../js/action";
import { loadImageListByBoardId } from "../../js/utils/image-utils";
import injectSheet from "react-jss";

const styles = {
  ul: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none"
  },
  li: {
    padding: "0 12px 12px 0"
  }
};

class Detail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      boardId: 0,
      isLoading: false,
      boardIndex: 0,
      boardName: "",
      imageArray: [],
      visible: false
    };
  }

  async componentDidMount() {
    // const { router } = this.props;
    const {
      id: boardId,
      index: boardIndex,
      name: boardName
    } = this.props.router.query;
    this.setState({
      boardId,
      boardIndex,
      boardName
    });
    this.setState({ isLoading: true });
    await loadImageListByBoardId(this.props, boardId);
    this.setState({ isLoading: false });
    // const imageArray = this.props.imageList.reduce((acc, x) => {
    //   acc.push({ src: x.image.medium.url });
    //   return acc;
    // }, []);
    this.setState({ imageArray: imageArray });
  }

  render() {
    const { classes } = this.props;

    return (
      <MainLayout>
        <Link href="/gallery">Go back to the gallery</Link>
        <h1>{this.state.boardName}</h1>
        <ul className={classes.ul}>
          {this.props.imageList &&
            this.props.imageList.length > 0 &&
            this.props.imageList.map((x, index) => (
              <li className={classes.li} key={x.index}>
                <img src={x.image.medium.url} />
              </li>
            ))}
        </ul>
        {/* <div>
          <button
            onClick={() => {
              this.setState({ visible: !this.state.visible });
            }}
          >
            show
          </button>
          <Viewer
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false });
            }}
            images={this.state.imageArray}
          />
        </div> */}
      </MainLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setImageListByBoardId: (imageList, nbImage, boardId) => {
    dispatch(setImageListByBoardId(imageList, nbImage, boardId));
  }
});

const mapStateToProps = state => ({
  imageList: state.imageList,
  boardId: state.boardId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(withRouter(Detail)));
