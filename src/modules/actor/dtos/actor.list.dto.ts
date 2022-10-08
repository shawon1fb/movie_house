import { PaginationListAbstract } from '../../../common/pagination/abstracts/pagination.abstract';
import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSort,
} from '../../../common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '../../../common/pagination/pagination.interface';
import {
    ACTOR_DEFAULT_AVAILABLE_SEARCH,
    ACTOR_DEFAULT_AVAILABLE_SORT,
    ACTOR_DEFAULT_PAGE,
    ACTOR_DEFAULT_PER_PAGE,
    ACTOR_DEFAULT_SORT,
} from '../constans/actor.list.constant';

export class ActorListDto implements PaginationListAbstract {
    @PaginationSearch(ACTOR_DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(ACTOR_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(ACTOR_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(ACTOR_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(ACTOR_DEFAULT_SORT, ACTOR_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(ACTOR_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];
}
